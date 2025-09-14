"use client"

import FruitSection from "@/app/components/store/FruitSection";
import {useEffect, useState} from "react";
import Product from "@/app/types/Product";
import {fetchProducts} from "@/app/firebase/firestore";

type StoreSectionProps = {
    initialProducts: Product[];
}

export default function StoreSection({initialProducts}: StoreSectionProps) {

    const [products, setProducts] = useState<Product[]>(initialProducts);

    useEffect(() => {
        fetchProducts().then(setProducts);
    }, [])

    return (
        <section className="fruits section" id="store">
            <h2 className="section__title">Store</h2>
            <span className="section__subtitle">What I sell</span>

            <div className="fruits__container container grid">
                {products.filter((product) => product.isPresent).map((i) => (
                    <FruitSection imageSrc={i.imageSrc} name={i.name} id={i.id} key={i.id}></FruitSection>
                ))}
            </div>
        </section>
    )
}
