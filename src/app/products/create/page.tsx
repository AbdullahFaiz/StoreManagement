'use client'

import { useState } from 'react'
import ProductForm from "@/components/product-form"
import { createProduct } from "@/app/actions/products"

// Define the functional component
export default function ProductsCreate() {
    const [isLoading, setIsLoading] = useState(false) // State to track loading status
    const [error, setError] = useState<string | null>(null) // State to track errors

    // Handle form submission
    const handleFormSubmit = async (formData: FormData) => {
        setIsLoading(true) // Set loading state to true
        setError(null) // Reset error state

        try {
            // Create a product and handle form validation errors
            await createProduct({ errors: {} }, formData)
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message) // Set the error message if available
            } else {
                setError('Something went wrong') // Fallback error message
            }
        } finally {
            setIsLoading(false) // Reset loading state
        }
    }
    if (isLoading) return <div className="flex justify-center items-center h-full">
        <div className="loader"></div> {/* Your loading spinner or indicator */}
    </div>;
    
    return (
        <main className="flex min-h-screen flex-col items-start p-10">
            <div className="w-full">
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="loader"></div> {/* Your loading spinner or indicator */}
                    </div>
                ) : (
                    <div>
                        {error && <p className="text-red-500">{error}</p>} {/* Display any error message */}
                        <ProductForm
                            formAction={handleFormSubmit} // Use the formAction handler
                            initialData={{
                                name: '',
                                description: '',
                                cost: '',
                                price: ''
                            }}
                        />
                    </div>
                )}
            </div>
        </main>
    )
}
