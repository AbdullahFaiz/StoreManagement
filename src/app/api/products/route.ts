
import { createProduct, getProductById, getProducts } from '@/repositories/productRepository';
import { Product } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export async function GET() {
  
    const res = await getProducts();
    return Response.json({ res })

}

export async function POST(req: NextApiRequest, res: NextApiResponse<Product>) {
  const newProduct = req.body as Omit<Product, 'id'>;
  const createdProduct = await createProduct(newProduct);
  
  return Response.json({ createdProduct })
}