'use client';

import { useState } from 'react';
import ProductForm from '@/components/product-form';
import { createProduct } from '@/app/actions/products';
import { redirect, useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export default function ProductsCreate() {
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const router = useRouter();

  const handleFormSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setFormErrors({});

    try {
      const formState = await createProduct({ errors: {} }, formData);
      console.log("formState.errors");
      console.log(formState.errors);
      if (Object.keys(formState.errors).length > 0) {
        setFormErrors(formState.errors); 
        console.log("errors");
      } else {
        console.log("success");
        router.push('/'); 
      }
    } catch (error: unknown) {
      console.error(error);
      setFormErrors({ _form: ['Something went wrong'] });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-start p-10">
      <div className="w-full">
        <ProductForm
          formAction={handleFormSubmit}
          initialData={{
            name: '',
            description: '',
            cost: '',
            price: '',
          }}
          errors={formErrors} 
        />
      </div>
    </main>
  );
}
