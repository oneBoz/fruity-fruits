import InventoryItem1 from "@/app/components/inventory/InventoryItem1";
import InventoryItem2 from "@/app/components/inventory/InventoryItem2";

export default function Home(){
    return (
        <main className="main">
            <InventoryItem1 imageSrc={"/images/fruits/apple/apple_group.jpeg"} name={"Apple"} id={"apple"} />
            <InventoryItem2 imageSrc={"/images/fruits/orange/orange_group.jpg"} name={"Orange"} id={"orange"} />
            <InventoryItem1 imageSrc={"/images/fruits/banana/banana_group.png"} name={"Banana"} id={"banana"} />
            <InventoryItem2 imageSrc={"/images/fruits/mango/mango_group.png"} name={"Mango"} id={"mango"} />
        </main>
    )
}