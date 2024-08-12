
import { fetchProducts } from "@/db/queries/products";
import Link from "next/link";
import ProductDelete from "@/components/product-delete";
import ProductCard from "@/components/productCard";
import { getProducts } from "@/repositories/productRepository";
import Navbar from "@/components/navBar";

export default async function Home() {
  const products = await getProducts() 
  const dateOptions: Intl.DateTimeFormatOptions = { 
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center p-8">
  
      <Navbar />

      <h1 className="text-3xl font-bold mb-8">Product List</h1>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-400">No products available.</p>
        )}
      </div>
    </main>
  );
}