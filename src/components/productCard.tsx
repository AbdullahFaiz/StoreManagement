
import { Product } from '@prisma/client';
import Link from 'next/link';
import tempImage from '@/assets/sample.png'
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="border p-4 text-center">
      <Link href={`/products/${product.id}/edit`}>
        <Image src={tempImage} alt={product.name} className="max-w-full h-auto" />
        <h3 className="text-lg font-medium">{product.name}</h3>
        <p className="text-gray-500">${product.price.toString()}</p>
      </Link>
    </div>
  );
};

export default ProductCard;