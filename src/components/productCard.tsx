
import { Product } from '@prisma/client';
import Link from 'next/link';
import tempImage from '@/assets/sample.jpg'
import Image from 'next/image';
import ProductDelete from './product-delete';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="border p-4 text-center">
    <Image src={tempImage} alt={product.name} className="max-w-full h-auto" />
    <h3 className="text-lg font-medium">{product.name}</h3>
    <p className="text-gray-500">${product.price.toString()}</p>
    <div className="mt-12 flex justify-end">
      <Link 
        href={`/products/${product.id}/edit`} 
        className="bg-blue-500 text-white hover:bg-blue-700 py-2 px-4 rounded-md"
      >
        Edit
      </Link>
      <ProductDelete id={product.id} />
    </div>
  </div>
  );
};

export default ProductCard;