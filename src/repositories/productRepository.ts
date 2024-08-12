import { PrismaClient, Product } from '@prisma/client';
const prisma = new PrismaClient();
export const getProducts = async (): Promise<Product[]> => {
  const products = await prisma.product.findMany();
  return products;
};
export async function getProductsByName(searchQuery?: string) {
  const products = await prisma.product.findMany({
    where: searchQuery
      ? {
          name: {
            contains: searchQuery,
            mode: "insensitive",
          },
        }
      : {},
  });

  return products;
}
export const getProductById = async (id: any): Promise<Product | null> => {
  const product = await prisma.product.findUnique({ where: { id } });
  return product;
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  console.log("prisma create");
  const newProduct = await prisma.product.create({ data: product });
  return newProduct;
};

export const updateProduct = async (id: any, product: Product): Promise<Product> => {
  const updatedProduct = await prisma.product.update({ where: { id }, data: product });
  return updatedProduct;
};

export const deleteProduct = async (id: any): Promise<void> => {
  await prisma.product.delete({ where: { id } });
};