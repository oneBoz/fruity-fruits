"use client"

import {Chip, Snackbar} from "@mui/joy";
import {useCart} from "@/app/contexts/CartContext";
import { useState } from "react";
import {products} from "@/app/types/Products";

type ProductItem2Props = {
    imageSrc: string;
    name: string;
    id: string;
    price: number;
    stock: number;
};

const ProductItem2 = ({id, name, imageSrc, price, stock}: ProductItem2Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const price_formatted = price.toLocaleString("en-SG", {
        style: "currency",
        currency: "SGD",
    })

    const {addToCart} = useCart();

    return (
        <section id={id} className={"section"}>
            <div className="product__bg">
                <div className="product__container container grid">
                    <div className="product__data">
                        <h2 className="product__title">{name}</h2>
                        <Chip className="product__price">{price_formatted}</Chip>
                        {stock} Left !
                        <button
                            className="product__button button button--small"
                            onClick={() => {
                                addToCart({
                                    id: products.filter((i) => i.name === name)[0].id,
                                    name: name, price: price, quantity: 1, imageSrc: imageSrc });
                                setIsOpen(true);
                            }}
                        >
                            Add to cart
                            <i className="uil uil-shopping-cart product__cart__icon"></i>
                        </button>
                    </div>
                    <img src={imageSrc} alt="image" className="product__img"/>
                </div>
            </div>
            <Snackbar
                open={isOpen}
                autoHideDuration={250}
                onClose={() => {setIsOpen(false)}}
                color="success"
                variant="soft"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                {name} added to cart!
            </Snackbar>
        </section>
    )
}

export default ProductItem2;