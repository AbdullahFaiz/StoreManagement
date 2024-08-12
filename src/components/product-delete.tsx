// this is a client component, because we need to use client-side feature
'use client'

// Importing the function to delete products.
import { deleteProduct } from "@/app/actions/products"

// Define the props that the ProductDelete component expects.
interface ProductDeleteProps {
    id: string, // The ID of the product to delete.
}

export default function ProductDelete({ id }: ProductDeleteProps) {
    // Define the action to perform when the form is submitted.
    // This is how we do it if we omit the bind from the server action
    const deleteAction = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the form from being submitted in the traditional way.
        deleteProduct(id); // Delete the product with the given ID.
    };

    // Render a form with a single submit button. When the button is clicked, the form is submitted 
    // and the deleteAction is performed.
    return <form onSubmit={deleteAction}>
        <button type="submit" className="text-sm opacity-30 text-red-500">Delete</button>
    </form>
}