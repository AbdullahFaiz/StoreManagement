// // import { createProduct, getProducts } from '@/repositories/productRepository';
// // import { Product } from '@prisma/client';
// // import type { NextApiRequest, NextApiResponse } from 'next';

// import { getProducts } from "@/repositories/productRepository";
// import { Product } from "@prisma/client";
// import { NextApiRequest, NextApiResponse } from "next";

// // export default async function handler(
// //   req: NextApiRequest,
// //   res: NextApiResponse<Product[] | Product>
// // ) {
// // console.log('api product:');
// // console.log('api product:');
// // console.log('api product:');

// //   if (req.method === 'GET') {
// //     console.log("GET API CALLLED");

// //     const products = await getProducts();
// //     res.status(200).json(products);   

// //   } else {
// //     res.setHeader('Allow', ['GET']);
// //     res.status(405).end(`Method ${req.method} Not Allowed`);
// //   }
// //   if (req.method === 'POST') {
// //     const newProduct = req.body as Omit<Product, 'id'>;
// //     const createdProduct = await createProduct(newProduct);
// //     res.status(201).json(createdProduct);
// //   } else {
// //     res.setHeader('Allow', ['GET', 'POST']);
// //     res.status(405).end(`Method ${req.method} Not Allowed`);
// //   }
// // }

// // function requestHandler(_request: Request): Response {
// //   return Response.json({ message: "Hello from Next.js!" });
// // }

// // export { requestHandler as GET };

// export async function GET(req: NextApiRequest, res: NextApiResponse<Product[]>) {
//   const products = await getProducts();
//   res.status(200).json(products);
// }

import { createProduct, getProductById, getProducts } from '@/repositories/productRepository';
import { Product } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

// export async function GET(req: NextApiRequest, res: NextApiResponse<Product[]>) {
//   const products = await getProducts();
//   console.log("ROUTE ROUTE ");
//   console.log("ROUTE ROUTE ");
//   console.log("ROUTE ROUTE ");
//   console.log("ROUTE ROUTE ");
//   console.log("ROUTE ROUTE ");
//   console.log(products);
//   res.json(products);
// }
// export async function GET() {
  
// }
export async function GET() {
  // const { searchParams } = new URL(request.url)
  // const id = searchParams.get('id')
  // console.log("id")
  // console.log(id)
  // console.log(id)
  // if(id){
    // const product = await getProductById(id);
    // return Response.json({ product })
  // }else{
    const res = await getProducts();
    return Response.json({ res })
  // }
}

export async function POST(req: NextApiRequest, res: NextApiResponse<Product>) {
  const newProduct = req.body as Omit<Product, 'id'>;
  const createdProduct = await createProduct(newProduct);
  
  return Response.json({ createdProduct })
}