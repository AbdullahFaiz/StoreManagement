
import { createProduct, getProductById, getProducts } from '@/repositories/productRepository';
import { Product } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export async function GET() {
  
    const res = await getProducts();
    return Response.json({ res })

}