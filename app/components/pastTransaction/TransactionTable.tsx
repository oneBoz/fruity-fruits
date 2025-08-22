"use client"
import Order from "@/app/types/Order";
import {products} from "@/app/types/Products";

interface TransactionTableProps {
    orders: Order[];
}

const TransactionTable = ({orders}: TransactionTableProps) => {
    return (
        <div className="container grid">
            <table className="transaction__table">
                <thead className="bg-gray-100">
                <tr>
                    <th className="border hide-mobile">Order ID</th>
                    <th className="border hide-mobile">Status</th>
                    <th className="border border-gray-200 px-4 py-2">Total</th>
                    <th className="border hide-mobile">Date</th>
                    <th className="border border-gray-200 px-4 py-2">Items</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.id} className="transaction__table__row">
                        <td className="hide-mobile">{order.id}</td>
                        <td className="hide-mobile">{order.status}</td>
                        <td className="">
                            ${order.totalPrice.toFixed(2)}
                        </td>
                        <td className="hide-mobile">
                            {order.createdAt
                                ? new Date(order.createdAt.seconds * 1000).toLocaleString()
                                : "N/A"}
                        </td>
                        <td className="">
                            {order.items.map((item, index) => (
                                <div key={index}>
                                    • {products.filter((p) => p.id === item.productId)[0].name} x{item.quantity} (${item.price})
                                </div>
                            ))}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default TransactionTable;