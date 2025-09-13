import Product from "@/app/types/Product";

interface InventoryTableProps {
    products: Product[];
}

const InventoryTable = ({products}: InventoryTableProps) => {
    return (
        <div className="container grid">
            <table className="transaction__table">
                <thead className="bg-gray-100">
                <tr>
                    <th className="border hide-mobile">Product ID</th>
                    <th className="border ">Name</th>
                    <th className="border border-gray-200 px-4 py-2">Price</th>
                    <th className="border ">Stock</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id} className="transaction__table__row">
                        <td className="hide-mobile">{product.id}</td>
                        {product.isPresent ?
                            (
                                <td className="">{product.name}</td>
                            ) : (
                                <td className="">{product.name + "(hidden)"}</td>
                            )
                        }
                        <td className="">
                            ${product.price.toFixed(2)}
                        </td>
                        <td className="">{product.stock}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    )
}

export default InventoryTable;