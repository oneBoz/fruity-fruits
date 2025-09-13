"use client"

import ProductItem from "@/app/components/product/ProductItem";
import Product from "@/app/types/Product";
import {useEffect, useState} from "react";
import {fetchProducts} from "@/app/firebase/firestore";

export default function Home(){
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchProducts().then(setProducts);
    }, [products])

    return (
        <section className="inventory section">
            <h2 className="section__title">Store</h2>
            {products.filter((product) => product.isPresent).map((product, index) => (
                <ProductItem key={index} imageSrc={product.imageSrc} name={product.name} id={product.id} price={product.price} stock={product.stock} />
            ))}
        </section>
    )
}