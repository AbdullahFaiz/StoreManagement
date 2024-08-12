import { getProductById, getProducts } from "@/repositories/productRepository";
import { NextRequest } from "next/server";

type Params = {
    id: string;
};

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    
      console.log(params.id);
    // console.log(request.nextUrl.searchParams.get("id"));
    // const id = request.nextUrl.searchParams.get("id");
    console.log("id")
    // console.log(params)
    console.log(params.id)
    // console.log(params.id)
    // if(id){
      const product = await getProductById(params.id);
      return Response.json( product )
    // }else{
    //   const res = await getProducts();
    //   return Response.json({ res })
    // }
  }