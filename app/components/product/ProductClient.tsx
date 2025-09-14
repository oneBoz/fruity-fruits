"use client"

import ProductItem from "@/app/components/product/ProductItem";
import Product from "@/app/types/Product";
import {useEffect, useState} from "react";
import {fetchProducts} from "@/app/firebase/firestore";

type ProductClientProps = {
    initialProducts: Product[];
}

export default function ProductClient({initialProducts}: ProductClientProps) {
    const [products, setProducts] = useState<Product[]>(initialProducts);

    useEffect(() => {
        fetchProducts().then(setProducts);
    }, [])

    return (
        <section className="inventory section">
            <h2 className="section__title">Store</h2>
            {products.filter((product) => product.isPresent).map((product, index) => (
                <ProductItem key={index} imageSrc={product.imageSrc} name={product.name} id={product.id} price={product.price} stock={product.stock} />
            ))}
        </section>
    )
}