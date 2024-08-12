// Importing the function to fetch products from the database.
import { fetchProducts } from "@/db/queries/products";
import Link from "next/link";
// Importing a component that handles product deletion.
import ProductDelete from "@/components/product-delete";
import ProductCard from "@/components/productCard";

export default async function Home() {
  const products = await fetchProducts() // Fetching the products from the database.
  const dateOptions: Intl.DateTimeFormatOptions = { // Options for formatting dates.
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center p-8">
      <Link href="/products/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create Product
      </Link>
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