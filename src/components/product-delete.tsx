'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteProduct } from '@/app/actions/products';

interface ProductDeleteProps {
  id: string; 
}

export default function ProductDelete({ id }: ProductDeleteProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteProduct(id);
      router.push('/');
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = () => {
    setShowConfirmModal(false);
    handleDelete();
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };

  return (
    <>
      <button
        type="button"
        className="bg-red-500 text-white font-bold py-2 px-4 rounded mr-2 ml-2 px-4 disabled:opacity-50"
        onClick={handleDeleteClick}
        disabled={isLoading}
      >
        {isLoading ? 'Deleting...' : 'Delete'}
      </button>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md">
            <p>Are you sure you want to delete this product?</p>
            <div className="flex justify-end mr-4 ml-4 px-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleConfirmDelete}
                disabled={isLoading}
              >
                {isLoading ? 'Deleting...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
