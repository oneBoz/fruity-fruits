"use client"

import InventoryTable from "@/app/components/inventory/InventoryTable";
import Product from "@/app/types/Product";
import {fetchProducts} from "@/app/firebase/firestore";
import {useEffect, useState} from "react";
import {useUser} from "@/app/contexts/UserContext";
import {Autocomplete, DialogTitle, Input, Modal, ModalDialog, Snackbar, Stack} from "@mui/joy";
import {updateProduct} from "@/app/firebase/firestore";
import Error from "next/error";
import Link from "next/link";

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [targetProduct, setTargetProduct] = useState<string>("");
    const [targetHideProduct, setTargetHideProduct] = useState<string>("");
    const [targetStock, setTargetStock] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isUpdated, setIsUpdated] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const {isOwner} = useUser();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isQuantityModalOpen, setIsQuantityModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (isOwner === true) {
            fetchProducts().then(setProducts);
        }

    }, [products, isOwner]);

    async function hideItem(productName: string) {
        const prevProduct = products.find((product) => product.name === productName);
        if (!prevProduct) {
            setErrorMessage(`Product with name "${productName}" not found`);
            setIsUpdated(false);
            setIsOpen(true);
            return;
        }
        const newProduct = {...prevProduct, isPresent: !prevProduct.isPresent};
        await updateProduct(newProduct.id, newProduct);
        setIsUpdated(true);
        setIsOpen(true);
    }

    async function changeQuantity(productName: string, stock: number) {
        const prevProduct = products.find((product) => product.name === productName);
        if (!prevProduct) {
            setErrorMessage(`Product with name "${productName}" not found`);
            setIsUpdated(false);
            setIsOpen(true);
            return;
        }
        if (stock < 0) {
            setErrorMessage("Quantity must be at least 0!");
            setIsUpdated(false);
            setIsOpen(true);
            return;
        }

        const newProduct = {...prevProduct, stock: stock};
        await updateProduct(newProduct.id, newProduct);
        setIsUpdated(true);
        setIsOpen(true);
    }



    return (
        isOwner ? (
        <section className="inventory section">
            <InventoryTable products={products}/>
            <div className="container grid inventory__container">
                <Link href={"/pages/addProduct"} className="button button--flex button--small add__product__button">
                    Add product
                    <i className="uil uil-share button__icon"></i>
                </Link>
                <button className={"button button--small button--flex add__product__button"}
                    onClick={() =>setIsModalOpen(true)}
                >
                    Hide/ Unhide Item
                </button>
                <button className={"button button--small button--flex add__product__button"}
                        onClick={() => setIsQuantityModalOpen(true)}
                >
                    Change stock
                </button>
            </div>



            <Snackbar
                open={isOpen}
                autoHideDuration={2000}
                onClose={() => {setIsOpen(false)}}
                color={isUpdated? "success" : "danger"}
                variant="soft"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                {isUpdated? "changed successfully!" : errorMessage}
            </Snackbar>

            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <ModalDialog>
                    <DialogTitle sx={{
                        textAlign: "center",
                        alignItems: "center"
                    }}>Hide /unhide item</DialogTitle>
                    <Autocomplete
                        options={products.map((product) => product.name)}
                        onInputChange={(event, newValue) => setTargetHideProduct(newValue)}
                    />
                    <button
                        className="button button--small"
                        onClick={() => {
                            hideItem(targetHideProduct)
                            setIsModalOpen(false);
                        }}
                    >
                        Hide/ unhide Item
                    </button>
                </ModalDialog>
            </Modal>
            <Modal
                open={isQuantityModalOpen}
                onClose={() => setIsQuantityModalOpen(false)}
            >
                <ModalDialog>
                    <DialogTitle sx={{
                        textAlign: "center",
                        alignItems: "center"
                    }}>Change stock</DialogTitle>
                    <Autocomplete
                        options={products.map((product) => product.name)}
                        onInputChange={(event, newValue) => setTargetProduct(newValue)}
                    />
                    <Input
                        onChange={(event) => setTargetStock(Number(event.target.value))}
                        type="number"
                        placeholder="Enter Number"
                        id="stock"
                    />
                    <button
                        className="button button--small"
                        onClick={() => {
                            changeQuantity(targetProduct, targetStock)
                            setIsQuantityModalOpen(false);
                        }}
                    >
                        Change quantity
                    </button>
                </ModalDialog>
            </Modal>

        </section>) : (
            <Error statusCode={404} />
        )
    )
}