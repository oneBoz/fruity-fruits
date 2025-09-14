# fruity-fruits

## *Updates 

1. A more robust role base access control. (page will not render if not logged in)
2. Fruit items are no longer hard-coded, owner can `add` or `hide` products at the Inventory page (**Note** _product names_ are unique!) (`delete` is not implemented since all past fruits are recorded in order history and sales)
3. Environment variables are now hidden
4. Changed `window.location.href` to `router.push()`
5. Added static site generation to retrieve images during build time for `pages/Product` and `home page`
6. AddProduct page supports drag and drop for images (or browse for mobile devices)
![AddProduct page.png](public/doc/images/AddProduct%20page.png)


## Implemented User Stories

1. As a customer, I want to see a list of fruits that are available to buy (complete with stock and pricing information), so that I can decide which fruits I want to buy.

2. As a customer, I want to keep track of the fruits and quantity that I have shortlisted (including the total amount I need to pay), so that I can adjust my purchasing decisions as I shop.

3. As a customer, I want to submit my order of the fruits I selected, so that I can complete my purchase when I am done shopping. Assume that payment is done separate from this POS application.

4. As an owner, I want to see the orders that my customers have submitted, so that I can fulfill their orders.

6. **(NEW)** As an owner, I want to be able to add new fruits and amend my stock levels, so that I can keep my online store up to date.

7. As a customer, I want to be able to log in and see my order history, so that I can track my previous purchases.

11. As a customer, I want to be able to use the app on my phone so I can shop on the go.

12. As a customer, I want my order shortlist to be saved so that I can continue shopping on my device layer, even if I have not logged in.

15. As an owner, I do not want my customers to be able to see the whole store's order history, or amend my stocks, or perform any actions that should only be available for me.

## Getting Started
### Option 1:
Open https://fruity-fruits.vercel.app/ for demo

Create your user account or use the given owner account:

```
Owner acc:
email: publicfinalstaticvoidmain@gmail.com
pw: owner123

email: xenia@gmail.com
pw: test123
```

### Option 2:

Install node modules and run the development server:

```bash
npm install

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

