import "./globals.css"
import StoreSection from "@/app/components/store/StoreSection";
import {fetchProducts} from "@/app/firebase/firestore";

export const dynamic = "force-static";

export default async function Home() {
    const initialProducts = await fetchProducts();

    return (
        <main className="main">
            <StoreSection initialProducts={initialProducts} />
        </main>
    );
}
