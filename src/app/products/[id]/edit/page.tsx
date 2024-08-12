// This is a client component
'use client'

import { useState, useEffect } from "react";
import { updateProduct } from "@/app/actions/products";
import ProductForm from "@/components/product-form";
import { fetchProductById } from "@/db/queries/products";
import { Product } from "@prisma/client"; // Import the Product type
import { getProductById, getProducts } from "@/repositories/productRepository";
import { useRouter } from 'next/navigation';


interface ProductsEditProps {
    params: {
        id: string;
    };
}

export default function ProductsEdit({ params }: ProductsEditProps) {
    const { id } = params;
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            try {
                // const response3 = await fetch(`/api/products`);
                const response = await fetch(`/api/products/${id}`);
                // const response2 = await fetch(`/api/products`);
                // console.log(response2);
                console.log(response);
                const data = await response.json();
                setProduct(data);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Something went wrong');
                }
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                  }, 1000);
            }
        };

        fetchProduct();
    }, [id]);

    const handleUpdate = async (formData: FormData) => {
        setIsLoading(true);
        setError(null);
        try {
            // Create a formState object with an empty errors property
            

            // Call updateProduct with three parameters
            const formState = await updateProduct(id, { errors: {} }, formData);
            if (formState) {
                router.push('/'); // Redirect on success
              } else {
                setError('Product update failed'); // Handle unsuccessful update
              }
            // Optionally handle success, e.g., redirect or show a success message
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Something went wrong');
            }
        } finally {
            setTimeout(() => {
                setIsLoading(false);
              }, 1000);
        }
    };

    if (isLoading) return <div className="flex justify-center items-center h-full">
    <div className="loader"></div> {/* Your loading spinner or indicator */}
</div>;

    if (error) return <p className="text-red-500">{error}</p>;

    if (!product) return <p>Product not found.</p>;

    return (
        <main className="flex min-h-screen flex-col items-start p-10 from-indigo-500 to-blue-500">
        <div className="w-full max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <ProductForm 
                        formAction={handleUpdate} 
                        initialData={{ 
                            name: product.name, 
                            description: product.description, 
                            cost: product.cost.toString(), 
                            price: product.price.toString() 
                        }} 
                    />
            </div>
        </main>
    );
}
