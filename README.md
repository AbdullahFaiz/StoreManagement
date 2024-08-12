Next.js Store App
Project Overview:

This is a Next.js application that serves as a basic online store. It includes product listing, product details, product creation and update woth futre scope to add shopping functionalities.
Getting Started:

1. Clone the repository:

2. Install dependencies: 
        `cd store`
        `npm install`
3. Prisma Setup:

    Generate Prisma Client:
        `npx prisma generate`

    Push Prisma Schema to Database:
        `npx prisma db push`
    
    Seed Database:
        `npx prisma db seed`

4. Start development server: 
        `npm run dev`
        This will start a development server at `http://localhost:3000.`


This project uses Next.js for routing, React for UI, and Tailwind CSS for styling.
For deployment,  Next.js's built-in deployment Vercel is used.

