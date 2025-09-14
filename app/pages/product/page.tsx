import Product from "@/app/types/Product";
import {fetchProducts} from "@/app/firebase/firestore";
import ProductClient from "@/app/components/product/ProductClient";

export const dynamic = "force-static";

export default async function Home(){
    const initialProducts: Product[] = await fetchProducts();
    return <ProductClient initialProducts={initialProducts} />;
}