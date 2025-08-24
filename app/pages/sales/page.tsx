"use client"

import {useEffect, useState} from "react";
import {fetchOrders, fetchUsers} from "@/app/firebase/firestore";
import SalesTable from "@/app/components/sales/SalesTable";
import Order from "@/app/types/Order";
import User from "@/app/types/User";
import {useUser} from "@/app/contexts/UserContext";

export default function Home() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const { isOwner } = useUser();

    useEffect(() => {
        if (isOwner === false) {
            window.location.href = "/";
        } else if (isOwner === true) {
            fetchOrders().then(setOrders);
            fetchUsers().then(setUsers);
        }

    }, [isOwner]);
    return (
        <section className="sales section">
            <SalesTable orders={orders} users={users}></SalesTable>
        </section>
    )
}