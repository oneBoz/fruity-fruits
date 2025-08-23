"use client"

import ProductItem1 from "@/app/components/product/ProductItem1";
import ProductItem2 from "@/app/components/product/ProductItem2";
import Product from "@/app/types/Product";
import {useEffect, useState} from "react";
import {fetchProducts} from "@/app/firebase/firestore";

export default function Home(){
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        fetchProducts().then(setProducts);
    })

    function displayProducts(){
        console.log(products);
    }

    return (
        <section className="inventory section">
            <h2 className="section__title">Store</h2>
            {products.map((product, index) => (
                index % 2 == 0 ? (
                    <ProductItem1 imageSrc={product.imageSrc} name={product.name} id={product.name} price={product.price} key={product.id} stock={product.stock} />
                ) : (
                    <ProductItem2 imageSrc={product.imageSrc} name={product.name} id={product.name} price={product.price} key={product.id} stock={product.stock} />
                )
            ))}
        </section>
    )
}