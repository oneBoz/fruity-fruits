"use client"

import {Chip, Snackbar} from "@mui/joy";
import {useCart} from "@/app/contexts/CartContext";
import { useState } from "react";
import {products} from "@/app/types/Products";

type InventoryItem1Props = {
    imageSrc: string;
    name: string;
    id: string;
    price: number;
};

const InventoryItem1 = ({id, name, imageSrc, price}: InventoryItem1Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const price_formatted = price.toLocaleString("en-SG", {
        style: "currency",
        currency: "SGD",
    })

    const {addToCart} = useCart();

    return (
        <section id={id} className={"section"}>
            <div className="inventory__bg">
                <div className="inventory__container container grid">
                    <div className="inventory__data">
                        <h2 className="inventory__title">{name}</h2>
                        <Chip className="inventory__price">{price_formatted}</Chip>
                        <button
                            className="inventory__button button button--small"
                            onClick={() => {
                                addToCart({
                                    id: products.filter((i) => i.name === name)[0].id,
                                    name: name, price: price, quantity: 1, imageSrc: imageSrc });
                                setIsOpen(true);
                            }}
                        >
                            Add to cart
                            <i className="uil uil-shopping-cart inventory__cart__icon"></i>
                        </button>
                    </div>
                    <img src={imageSrc} alt="image" className="inventory__img"/>
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

export default InventoryItem1;