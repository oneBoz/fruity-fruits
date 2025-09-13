"use client"
import HistoryTable from "@/app/components/orderHistory/HistoryTable";
import {useUser} from "@/app/contexts/UserContext";
import {useState, useEffect} from "react";
import Order from "@/app/types/Order";
import {fetchOrdersByUid, fetchProducts} from "@/app/firebase/firestore";
import Product from "@/app/types/Product";


export default function Home() {
    const [orders, setOrders] = useState<Order[]>([]);
    const {uid} = useUser();

    useEffect(() => {
        fetchOrdersByUid(uid? uid : "").then(setOrders)
    }, [uid])

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchProducts().then(setProducts);
    }, [])

    function displayOrders() {
        console.log(orders);
    }

    return (
        <section className="orderHistory section">
            <h2 className="section__title">
                Past Transactions
            </h2>
            {/*<button onClick={() => fetchOrders(uid? uid : "").then(setOrders)}>fetch</button>*/}
            {/*<button onClick={displayOrders}>display</button>*/}
            <HistoryTable orders={orders} />
        </section>
    )
}