import {addDoc, collection, doc, runTransaction} from 'firebase/firestore';
import { db } from "./firebase"

interface Item {
    productId: string;
    price: number;
    quantity: number;
}

// export async function getProducts(): Promise<Product[]> {
//     const productsRef = collection(db, "products");
//     const snapshot = await getDocs(productsRef);
//
//     const products: Product[] = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...(doc.data() as Omit<Product, "id">),
//     }));
//
//     return products;
// }

export async function checkout(
    uid: string | null,
    items: Item[],
    status: string,
    totalPrice: number){
    const orderCollection = collection(db, "orders");
    return await runTransaction(db, async (transaction) => {
        // Step 1: Preload all product references
        const productRefs = items.map((item) => doc(db, "products", item.productId));

        // Step 2: Fetch all products
        const productSnapshots = await Promise.all(productRefs.map(ref => transaction.get(ref)));

        // Step 3: Validate stock for each product
        productSnapshots.forEach((snap, index) => {
            if (!snap.exists()) {
                throw new Error(`Product ${items[index].productId} does not exist`);
            }
            const productData = snap.data();
            const currentStock = productData?.stock ?? 0;

            if (currentStock < items[index].quantity) {
                throw new Error(
                    `Not enough stock for ${productData.name}. Available: ${currentStock}`
                );
            }
        });

        // Step 4: Update stock for all products
        productSnapshots.forEach((snap, index) => {
            const productRef = productRefs[index];
            const productData = snap.data();
            const currentStock = productData.stock;

            transaction.update(productRef, {
                stock: currentStock - items[index].quantity,
            });
        });

        // Step 5: Create order document
        const orderRef = await addDoc(orderCollection, {
            uid,
            items,
            status,
            totalPrice,
            createdAt: new Date(),
        });

        return orderRef.id;
    });

}
