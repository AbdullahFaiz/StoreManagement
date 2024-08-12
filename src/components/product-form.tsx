'use client';

import { useState, useEffect } from 'react';

interface ProductFormProps {
  formAction: (formData: FormData) => Promise<void>;
  initialData: {
    name: string;
    description: string;
    cost: string;
    price: string;
  };
  errors?: {
    name?: string[];
    description?: string[];
    cost?: string[];
    price?: string[];
    _form?: string[];
  };
}

export default function ProductForm({ formAction, initialData, errors = {} }: ProductFormProps) {
  const [formErrors, setFormErrors] = useState(errors);

  useEffect(() => {
    setFormErrors(errors);
  }, [errors]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await formAction(formData);
  };

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        {initialData.name ? 'Update' : 'Create'} Product
      </h1>

      {formErrors._form && (
        <div className="text-red-600 text-sm mt-1">{formErrors._form.join(', ')}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto space-y-8 p-8 bg-white rounded-lg shadow-lg"
      >
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-900">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={initialData.name}
            className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base p-3"
          />
          {formErrors.name && (
            <div className="text-red-600 text-sm mt-1">{formErrors.name.join(', ')}</div>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-900">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={initialData.description}
            className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base h-32 p-3"
          ></textarea>
          {formErrors.description && (
            <div className="text-red-600 text-sm mt-1">{formErrors.description.join(', ')}</div>
          )}
        </div>

        <div>
          <label htmlFor="cost" className="block text-lg font-medium text-gray-900">
            Cost
          </label>
          <input
            type="text"
            id="cost"
            name="cost"
            defaultValue={initialData.cost}
            className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base p-3"
          />
          {formErrors.cost && (
            <div className="text-red-600 text-sm mt-1">{formErrors.cost.join(', ')}</div>
          )}
        </div>

        <div>
          <label htmlFor="price" className="block text-lg font-medium text-gray-900">
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            defaultValue={initialData.price}
            className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base p-3"
          />
          {formErrors.price && (
            <div className="text-red-600 text-sm mt-1">{formErrors.price.join(', ')}</div>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Save
          </button>

          <a
            href="/"
            className="bg-gray-500 text-white hover:bg-gray-700 py-3 px-6 rounded-md ml-4"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
