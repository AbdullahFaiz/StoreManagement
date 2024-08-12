import { PrismaClient, Product } from '@prisma/client';
const prisma = new PrismaClient();
console.log("client");
  console.log("client");
export const getProducts = async (): Promise<Product[]> => {
  console.log("prisma");
  console.log("prisma");
  console.log("prisma");
  const products = await prisma.product.findMany();
  console.log("products prisma get",products);
  console.log(products);

  return products;
};

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