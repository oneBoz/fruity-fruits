"use client"

import InventoryTable from "@/app/components/inventory/InventoryTable";
import Product from "@/app/types/Product";
import {fetchProducts} from "@/app/firebase/firestore";
import {useEffect, useState} from "react";
import {useUser} from "@/app/contexts/UserContext";
import {Autocomplete, Button, Input, Snackbar, Stack} from "@mui/joy";
import {updateProduct} from "@/app/firebase/firestore";
import Error from "next/error";
import Link from "next/link";
import {margin} from "@mui/system";

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [targetProduct, setTargetProduct] = useState<string>("");
    const [targetHideProduct, setTargetHideProduct] = useState<string>("");
    const [targetStock, setTargetStock] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isUpdated, setIsUpdated] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const {isOwner} = useUser();

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
            <Stack
                className="container"
                direction="row"
                sx={{
                    margin: 2,
                }}
            >
                <Link href={"/pages/addProduct"} className={"button button--small button--flex add__product__button"}>
                    Add Product
                </Link>
                <Autocomplete
                    options={products.map((product) => product.name)}
                    onInputChange={(event, newValue) => setTargetHideProduct(newValue)}
                />
                <Button
                    sx={{
                        backgroundColor: 'hsl(250, 69%, 61%)',
                        '&:hover': {
                            backgroundColor: 'hsl(250, 69%, 50%)', // optional hover color
                        },
                    }}
                    onClick={() => hideItem(targetHideProduct)}
                >Hide/ Unhide Item</Button>
            </Stack>

            <h2 className="section__title">Change stock</h2>
            <Stack
                direction="row"
                className="container"
                columnGap={"1rem"}
            >
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
                <Button
                    sx={{
                        backgroundColor: 'hsl(250, 69%, 61%)',
                        '&:hover': {
                            backgroundColor: 'hsl(250, 69%, 50%)', // optional hover color
                        },
                    }}
                    onClick={() => changeQuantity(targetProduct, targetStock)}
                >
                    Change quantity
                </Button>
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
            </Stack>

        </section>) : (
            <Error statusCode={404} />
        )
    )
}