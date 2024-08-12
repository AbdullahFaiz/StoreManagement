// this is a server action
'use server'

// Import the database client and the Product type from Prisma
import { db } from '@/db'
import type { Product } from '@prisma/client'

// Import the revalidatePath and redirect functions from Next.js
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Import the Zod library for validation
import { z } from 'zod'

// Define a schema for the product using Zod
const productSchema = z.object({
    // the name must be a string between 3 and 255 characters
    name: z.string().min(3).max(255),
    // the description must be a string between 10 and 4000 characters
    description: z.string().min(10).max(4000),
    // cost must be a positive number with up to two decimal places
    cost: z.string().regex(/^\d+(\.\d{1,2})?$/, "Cost must be a valid currency value"),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid currency value")
})

// Define an interface for the form state
interface ProductFormState {
    errors: {
        name?: string[],
        description?: string[],
        cost?: string[],
        price?: string[],
        _form?: string[],
    }
}

// Define an asynchronous function to create a product
export async function createProduct(
    formState: ProductFormState,
    formData: FormData
): Promise<ProductFormState> {
    // Validate the form data against the product schema
    // If the form data does not match the schema, the safeParse method returns an object 
    // with a success property of false and an error property containing the validation errors. 
    // If the form data matches the schema, the safeParse method returns an object 
    // with a success property of true and a data property containing the validated data. 
    const result = productSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        cost: formData.get('cost'),
        price: formData.get('price'),
    })

    // If validation fails, return the errors
    if (!result.success) {
        return {
            // The flatten method is used to convert the validation errors into a flat object structure 
            // that can be easily displayed in the form.
            errors: result.error.flatten().fieldErrors
        }
    }

    let product: Product
    try {
        // If validation passes, create a new product in the database
        product = await db.product.create({
            data: {
                name: result.data.name,
                description: result.data.description,
                cost: result.data.cost,
                price: result.data.price,
            }
        })
    } catch (error: unknown) {
        // If there's an error, return it
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            }
        }
        else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }

    // Revalidate the path and redirect to the home page
    revalidatePath('/')
    redirect('/')
}
export async function updateProduct(
    id: string,
    formState: ProductFormState, // This should be used for error handling
    formData: FormData
): Promise<ProductFormState> {
    console.log("update");
    console.log("update");
    console.log("update");
    const result = productSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        cost: formData.get('cost'),
        price: formData.get('price'),
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        };
    }

    try {
        await db.product.update({
            where: { id },
            data: {
                name: result.data.name,
                description: result.data.description,
                cost: result.data.cost,
                price: result.data.price,
            }
        });

        // Optionally, you might want to add logic for success scenarios here
        return { errors: {} }; // No errors
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            };
        } else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            };
        }
    }
}

// export async function updateProduct2(
//     id: string,
//     formState: ProductFormState,
//     formData: FormData
// ): Promise<ProductFormState> {
//     const result = productSchema.safeParse({
//         name: formData.get('name'),
//         description: formData.get('description'),
//         cost: formData.get('cost'),
//         price: formData.get('price'),
//     })

//     if (!result.success) {
//         return {
//             errors: result.error.flatten().fieldErrors
//         }
//     }

//     let product: Product
//     try {
//         product = await db.product.update({
//             where: { id },
//             data: {
//                 name: result.data.name,
//                 description: result.data.description,
//                 cost: result.data.cost,
//                 price: result.data.price,
//             }
//         })
//     } catch (error: unknown) {
//         if (error instanceof Error) {
//             return {
//                 errors: {
//                     _form: [error.message],
//                 },
//             }
//         }
//         else {
//             return {
//                 errors: {
//                     _form: ['Something went wrong'],
//                 },
//             }
//         }
//     }

//     revalidatePath('/')
//     redirect('/')
// }

export async function deleteProduct(
    id: string,
): Promise<ProductFormState> {
    let product: Product
    try {
        product = await db.product.delete({
            where: { id },
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            }
        }
        else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }

    revalidatePath('/')
    redirect('/')
}