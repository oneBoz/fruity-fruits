"use client"
import {useCart} from "@/app/contexts/CartContext";
import {useUser} from "@/app/contexts/UserContext";
import {useState} from "react";
import { Chip, Snackbar } from "@mui/joy";
import {checkout} from "@/app/firebase/firestore";
import CartItem from "@/app/types/CartItem";

interface Item {
    productId: string;
    price: number;
    quantity: number;
}

function formatPrice(value: number) {
    return value.toLocaleString("en-SG", {
        style: "currency",
        currency: "SGD",
    })
}

export default function CartPage() {
    const [quantity, setQuantity] = useState<string>("");
    const { uid } = useUser();
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const total = cart.reduce((acc, item) => acc + item.quantity*item.price, 0);
    const total_formatted = formatPrice(total);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    function displayCart() {
        console.log(cart);
    }

    function sendOrder(cart: CartItem[]) {
        const items: Item[] = cart.map((item: CartItem): Item => ({
            productId: item.id,
            price: item.price,
            quantity: item.quantity,
        }));
        checkout(uid, items, "completed", total)
            .then((s) => {
                setIsSuccess(true);
                clearCart();
            }).catch((e: unknown) => {
            if (e instanceof Error) {
                setErrorMessage(e.message);
            } else {
                setErrorMessage("an unexpected error has occurred")
            }
            setIsSuccess(false);
        }).finally(() => {
            setIsOpen(true);
        })
    }

    return (
        <section className="cart section">
            <div className="cart__container container grid">
                <h1 className="cart__title">Your Cart</h1>
                {cart.length === 0 ? (
                    <p>Cart is empty</p>
                ) : (
                    <ul className="cart__list">
                        {cart.map((item) => (
                            <li className="cart__list__item" key={item.id}>
                                <img className="cart__img" alt={"image"} src={item.imageSrc}/>
                                <div className="cart__list__item__info">
                                    <h4>{item.name} </h4>
                                    <Chip>{formatPrice(item.price)}</Chip>
                                </div>
                                <div className="cart__btns">
                                    <div className="cart__item__update">
                                        <span
                                            className="button button--flex button--small button--link cart__arrow"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            <i className="uil uil-angle-up button__icon"></i>
                                        </span>
                                        {item.quantity}
                                        <span
                                            className="button button--flex button--small button--link cart__arrow"
                                            onClick={() => {
                                                item.quantity === 1 ?
                                                    removeFromCart(item.id) :
                                                    updateQuantity(item.id, item.quantity - 1)}
                                            }
                                        >
                                            <i className="uil uil-angle-down button__icon"></i>
                                        </span>
                                    </div>

                                    <button
                                        className="button button--small button__icon"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <i className="uil uil-trash-alt"></i>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

            </div>
            <div className="container">
                <button className="button button--link cart__clear__button" onClick={clearCart}>Clear Cart</button>
                <div className="cart__checkout">
                    <h3 className="cart__total">Total: {total_formatted}</h3>
                    <button
                        className="button button__small cart__checkout__button"
                        onClick={() => {
                            if (cart.length === 0) {
                                setErrorMessage("Cart is empty!")
                                setIsSuccess(false);
                                setIsOpen(true);
                            } else if (uid && uid.trim() === "") {
                                setErrorMessage("Please log in first!");
                                setIsSuccess(false);
                                setIsOpen(true);
                            } else {
                                sendOrder(cart);
                            }
                        }}>
                        Checkout
                        <i className="uil uil-arrow-right button__icon"></i>
                    </button>
                    {/*<button onClick={displayCart}>display</button>*/}
                </div>
            </div>
            <Snackbar
                open={isOpen}
                autoHideDuration={2000}
                onClose={() => {setIsOpen(false)}}
                color={isSuccess ? "success": "danger"}
                variant="soft"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                {isSuccess ? "Successfully checkout" : errorMessage}
            </Snackbar>

        </section>
    );
}