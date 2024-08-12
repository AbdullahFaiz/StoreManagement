
'use server'

import { db } from '@/db'
import type { Product } from '@prisma/client'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const productSchema = z.object({
    name: z.string().min(3).max(255),
    description: z.string().min(10).max(4000),
    cost: z.string().regex(/^\d+(\.\d{1,2})?$/, "Cost must be a valid currency value"),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid currency value")
})

interface ProductFormState {
    errors: {
        name?: string[],
        description?: string[],
        cost?: string[],
        price?: string[],
        _form?: string[],
    }
}
export async function createProduct(
    formState: ProductFormState,
    formData: FormData
  ): Promise<ProductFormState> {
    const result = productSchema.safeParse({
      name: formData.get('name'),
      description: formData.get('description'),
      cost: formData.get('cost') ,
      price: formData.get('price'),
    });
  
    if (!result.success) {
    console.log('result');
    console.log(result);

      return {
        errors: result.error.flatten().fieldErrors,
      };
    }
  
    const { name, description, cost, price } = result.data;
    console.log('va');
    try {
      const product = await db.product.create({
        data: {
          name,
          description,
          cost,
          price,
        },
      });
  
      
      console.log('Product created successfully:', product);
  
      return formState; 
    } catch (error: unknown) {
      console.error('Error creating product:', error);
  
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

export async function updateProduct(
    id: string,
    formState: ProductFormState, 
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

        
        return { errors: {} }; 
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