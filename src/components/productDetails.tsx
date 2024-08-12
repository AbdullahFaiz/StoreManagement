import { Product } from "@prisma/client";


interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-lg">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">Price: ${product.price.toString()}</span>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
