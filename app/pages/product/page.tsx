"use client"

import ProductItem from "@/app/components/product/ProductItem";
import Product from "@/app/types/Product";
import {useEffect, useState} from "react";
import {fetchProducts} from "@/app/firebase/firestore";

export default function Home(){
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchProducts().then(setProducts);
    }, [])

    return (
        <section className="inventory section">
            <h2 className="section__title">Store</h2>
            {products.map((product, index) => (
                <ProductItem imageSrc={product.imageSrc} name={product.name} id={product.name} price={product.price} key={product.id} stock={product.stock} />
            ))}
        </section>
    )
}