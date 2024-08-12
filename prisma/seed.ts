
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'Product A',
        description: 'This is the description for Product A.',
        cost: 10.99,
        price: 15.99,
      },
      {
        name: 'Product B',
        description: 'This is the description for Product B.',
        cost: 12.49,
        price: 19.99,
      },
      {
        name: 'Product C',
        description: 'This is the description for Product C.',
        cost: 8.99,
        price: 12.99,
      },
      {
        name: 'Product D',
        description: 'This is the description for Product D.',
        cost: 20.00,
        price: 25.00,
      },
      {
        name: 'Product E',
        description: 'This is the description for Product E.',
        cost: 7.50,
        price: 10.00,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
