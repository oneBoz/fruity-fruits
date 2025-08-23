"use client"

import InventoryTable from "@/app/components/inventory/InventoryTable";
import Product from "@/app/types/Product";
import {fetchProducts} from "@/app/firebase/firestore";
import {useEffect, useState} from "react";
import {useUser} from "@/app/contexts/UserContext";
import {Autocomplete, Button, Input, Snackbar, Stack} from "@mui/joy";
import {updateProduct} from "@/app/firebase/firestore";

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [targetProduct, setTargetProduct] = useState<string>("");
    const [targetStock, setTargetStock] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isUpdated, setIsUpdated] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const {isOwner} = useUser();

    useEffect(() => {
        if (isOwner === false) {
            window.location.href = "/";
        } else if (isOwner === true) {
            fetchProducts().then(setProducts);
        }

    }, [isOwner, isOpen]);

    async function changeQuantity(productName: string, stock: number) {
        const prevProduct = products.find((product) => product.name === productName);
        if (!prevProduct) {
            setErrorMessage(`Product with name "${productName}" not found`);
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
        <section className="inventory section">
            <InventoryTable products={products}/>
            <Stack
                direction="row"
                className="container"
            >
                <Autocomplete
                    options={products.map((product) => product.name)}
                    onInputChange={(event, newValue) => setTargetProduct(newValue)}
                />
                <Input
                    onChange={(event) => setTargetStock(Number(event.target.value))}
                    type="number"
                    placeholder="Enter Number"
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
        </section>
    )
}