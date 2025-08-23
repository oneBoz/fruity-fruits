import Order from "@/app/types/Order";
import User from "@/app/types/User";
import {products} from "@/app/types/Products";

interface SalesTableProps {
    orders: Order[];
    users: User[];
}

const SalesTable = ({orders, users}: SalesTableProps) => {
    const userMap = new Map(users.map(user => [user.uid, user.userName]));

    const sales = orders.map(order => ({
        customerName: userMap.get(order.uid),
        ...order
    }));

    function displaySales() {
        console.log(userMap);
    }
    return (
        <div className="container grid">
            <table className="transaction__table">
                <thead className="bg-gray-100">
                <tr>
                    <th className="border hide-mobile">Order ID</th>
                    <th className="border">Customer</th>
                    <th className="border hide-mobile">Status</th>
                    <th className="border border-gray-200 px-4 py-2">Total</th>
                    <th className="border hide-mobile">Date</th>
                    <th className="border border-gray-200 px-4 py-2">Items</th>
                </tr>
                </thead>
                <tbody>
                {sales.map((sale) => (
                    <tr key={sale.id} className="transaction__table__row">
                        <td className="hide-mobile">{sale.id}</td>
                        <td className="">{sale.customerName}</td>
                        <td className="hide-mobile">{sale.status}</td>
                        <td className="">
                            ${sale.totalPrice.toFixed(2)}
                        </td>
                        <td className="hide-mobile">
                            {sale.createdAt
                                ? new Date(sale.createdAt.seconds * 1000).toLocaleString()
                                : "N/A"}
                        </td>
                        <td className="">
                            {sale.items.map((item, index) => (
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

export default SalesTable;