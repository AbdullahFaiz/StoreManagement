import { getProducts, getProductsByName } from "@/repositories/productRepository";
import Navbar from "@/components/navBar";
import ProductCard from "@/components/productCard";

const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export default async function Home({ searchParams }: { searchParams: { search?: string } }) {
  
  const searchQuery = searchParams.search || "";
  const products = await getProductsByName(searchQuery);

  return (
    <main className="flex flex-col min-h-screen items-center justify-center p-8">
      <Navbar />

      <h1 className="text-3xl font-bold mb-8">Product List</h1>

      <div className="w-full max-w-md mb-8">
        <form method="GET">
          <input
            type="text"
            name="search"
            defaultValue={searchQuery}
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Search
          </button>
        </form>
      </div>

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
