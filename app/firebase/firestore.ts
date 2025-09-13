import {
    addDoc,
    collection,
    doc, getCountFromServer,
    getDocs,
    orderBy,
    query,
    runTransaction,
    serverTimestamp, setDoc, updateDoc,
    where
} from 'firebase/firestore';
import { db } from "./firebase"
import Order from "@/app/types/Order";
import Product from "@/app/types/Product";
import User from "@/app/types/User";
import {getDoc, getFirestore} from "@firebase/firestore";
import {uploadImage} from "@/app/firebase/storage";

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
            if (productData) {
                const currentStock = productData.stock;
                transaction.update(productRef, {
                    stock: currentStock - items[index].quantity,
                });
            }


        });

        // Step 5: Create order document
        const orderRef = await addDoc(orderCollection, {
            uid,
            items,
            status,
            totalPrice,
            createdAt: serverTimestamp(),
        });

        return orderRef.id;
    });
}

export async function fetchOrdersByUid(uid: string) {
    const ordersRef = collection(db, "orders");
    const q = query(
        ordersRef,
        where("uid", "==", uid),
        orderBy("createdAt", "desc") // latest first
    );

    const querySnapshot = await getDocs(q);
    const userOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Order[];
    return userOrders;
}

export async function fetchOrders() {
    const ordersRef = collection(db, "orders");
    const q = query(
        ordersRef,
        orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const userOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Order[];
    return userOrders;
}

export async function fetchUsers() {
    const usersRef = collection(db, "users");
    const usersSnapshot = await getDocs(usersRef);
    const users = usersSnapshot.docs.map((doc) => ({
        ...doc.data(),
    })) as User[];
    return users;
}

export async function fetchProducts() {
    const productsRef = collection(db, "products");
    const productsSnapshot = await getDocs(productsRef);
    const products = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Product[];
    return products;
}

export async function getCollectionCount(colName: string) {
    const db = getFirestore();
    const col = collection(db, colName);
    const snapshot = await getCountFromServer(col);
    return snapshot.data().count;
}

export async function addProduct(
    name: string,
    price: number,
    quantity: number,
    url: string
) {
    const productRef = await addDoc(collection(db, "products"), {
        name,
        price,
        stock: quantity,
        imageSrc: url,
        isPresent: true,
    });
    await updateDoc(productRef, { id: productRef.id });
}

export async function updateProduct(id: string, product: Product) {
    const productRef = doc(db, "products", id);
    const docSnap = await getDoc(productRef);
    if (!docSnap.exists()) {
        throw new Error(`Product with ID ${id} does not exist`);
    }
    // Update only the fields present in "product"
    await updateDoc(productRef, { ...product });

}