import type { Product } from '@prisma/client' // Importing the Product type from the Prisma client library.
import { db } from '@/db'
import { notFound } from 'next/navigation' // Importing the notFound function from Next.js for handling 404 errors.

export async function fetchProducts(): Promise<Product[]> {  // Function to fetch all products from the database.
    return await db.product.findMany({
        orderBy: [
            {
                updatedAt: 'desc',
            }
        ],
    })
}

export async function fetchProductById(id: string): Promise<Product | null> { // Function to fetch a single product by its ID.
    const product = await db.product.findFirst({
        where: {
            id
        }
    })

    if (!product) {
        notFound() // If the product is not found, a 404 error is thrown.
    }

    return product
}