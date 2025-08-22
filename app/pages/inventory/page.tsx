import InventoryItem1 from "@/app/components/inventory/InventoryItem1";
import InventoryItem2 from "@/app/components/inventory/InventoryItem2";
import {products} from "@/app/types/Products";

export default function Home(){
    return (
        <section className="inventory section">
            <h2 className="section__title">Store</h2>
            {products.map((product, index) => (
                index % 2 == 0 ? (
                    <InventoryItem1 imageSrc={product.imageSrc} name={product.name} id={product.name} price={product.price} key={product.id}/>
                ) : (
                    <InventoryItem2 imageSrc={product.imageSrc} name={product.name} id={product.name} price={product.price} key={product.id}/>
                )
            ))}
        </section>
    )
}