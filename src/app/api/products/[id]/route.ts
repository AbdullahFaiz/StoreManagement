import { getProductById, getProducts } from "@/repositories/productRepository";
import { NextRequest } from "next/server";

type Params = {
    id: string;
};

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    console.log(params.id)
      const product = await getProductById(params.id);
      return Response.json( product )
    
  }