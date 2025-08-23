interface Item {
    productId: string;
    price: number;
    quantity: number;
}

export default interface Order {
    id: string;
    items: Item[];
    uid: string;
    totalPrice: number;
    status: "pending" | "completed" | "rejected" | "delivered";
    createdAt: { seconds: number; nanoseconds: number };
}