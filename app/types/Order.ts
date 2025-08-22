interface Item {
    productId: string;
    price: number;
    quantity: number;
}

export default interface Order {
    id: number;
    customerId: string;
    productId: string;
    items: Item[];
    status: "pending" | "completed" | "rejected" | "delivered";
    totalPrice: number;
}