import type { Product } from '@prisma/client' 
import { db } from '@/db'
import { notFound } from 'next/navigation'

export async function fetchProducts(): Promise<Product[]> {  
    return await db.product.findMany({
        orderBy: [
            {
                updatedAt: 'desc',
            }
        ],
    })
}

export async function fetchProductById(id: string): Promise<Product | null> { 
    const product = await db.product.findFirst({
        where: {
            id
        }
    })

    if (!product) {
        notFound() 
    }

    return product
}