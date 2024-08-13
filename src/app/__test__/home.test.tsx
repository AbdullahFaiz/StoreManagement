import { render, screen, waitFor } from '@testing-library/react';
import Home from '../page';
import { getProductsByName } from '@/repositories/productRepository';

jest.mock('@/repositories/productRepository');

describe('Home component', () => {
  it('renders product list with search bar', async () => {
    const mockProducts = [
      { id: 1, name: 'Product A' },
      { id: 2, name: 'Product B' },
    ];

    (getProductsByName as jest.Mock).mockResolvedValueOnce(mockProducts);

    render(<Home searchParams={{ search: '' }} />);

  
    await waitFor(() => {
      expect(screen.getByText('Product A')).toBeInTheDocument();
    });
  });
});
