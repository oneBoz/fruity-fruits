"use client"

import {useUser} from "@/app/contexts/UserContext";
import Error from "next/error";
import {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {addProduct, fetchProducts} from "@/app/firebase/firestore";
import {uploadImage} from "@/app/firebase/storage";

export default function Home() {
    const {isOwner} = useUser();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("/images/fruits/apple/apple_group.jpeg");
    const [productPrice, setProductPrice] = useState<string>("");
    const [productName, setProductName] = useState<string>("");
    const [productQuantity, setProductQuantity] = useState<string>("");
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);

    useEffect(() => {
        if (imageFile) {
            const objectUrl = URL.createObjectURL(imageFile);
            setPreviewUrl(objectUrl);

            return () => URL.revokeObjectURL(objectUrl); // cleanup
        }
    }, [imageFile])

    function resetState() {
        setProductName("");
        setProductPrice("");
        setProductQuantity("");
        setImageFile(null);
        setUploadProgress(null);
    }

    const addNewProduct = async (event: React.FormEvent) => {
        event.preventDefault();

        try {

            if (imageFile && productQuantity && productPrice && productName) {
                const quantity = parseInt(productQuantity) || 0;
                const price = parseFloat(productPrice) || 0;
                const products = await fetchProducts();

                if (products.find((product) => product.name === productName)) {
                    resetState();
                    alert("Product already exists!");
                    return;
                }

                setUploadProgress(0);
                const imgUrl = await uploadImage(productName, imageFile, (progress) => {
                    setUploadProgress(progress);
                });
                await addProduct(productName, price, quantity, imgUrl);

                resetState();
                alert("Product added successfully!");

            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        isOwner ? (
            <section className="add__product section">
                <h2 className={"section__title"}>Add Product</h2>
                <div className="add__product__container container grid">
                    <form className="add__product__form" onSubmit={addNewProduct} id="productForm">

                        <label
                            htmlFor="productImage"
                            className={`product__drag__area ${isDragging ? "dragging" : ""}`}
                            onDragOver={(e) => e.preventDefault()}
                            onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                            onDrop={(e) => {
                                e.preventDefault();
                                setIsDragging(false);
                                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                    setImageFile(e.dataTransfer.files[0]);
                                }
                            }}
                        >
                            {imageFile && (
                                <Image
                                    src={URL.createObjectURL(imageFile)}
                                    alt="Preview"
                                    width={200}
                                    height={200}
                                    className="add__product__image"
                                />
                            )}
                            Drag & drop or Browse
                            <input
                                type="file"
                                id="productImage"
                                hidden
                                accept='.png, .jpg, .jpeg'
                                onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                        setImageFile(e.target.files[0]);
                                    }
                                }}
                            />
                        </label>

                        <div className="product__inputs grid">
                            <div className="product__content">
                                <label className="product__label" htmlFor="productName">Product Name</label>
                                <input
                                    type="text"
                                    className="product__input"
                                    id="productName"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            </div>
                            <div className="product__content">
                                <label className="product__label" htmlFor="productPrice">Product price</label>
                                <input
                                    type="number"
                                    className="product__input"
                                    id="productPrice"
                                    value={productPrice}
                                    onChange={(e) => setProductPrice(e.target.value)}
                                />
                            </div>
                            <div className="product__content">
                                <label className="product__label" htmlFor={"productQuantity"}>Product quantity</label>
                                <input
                                    type="number"
                                    className="product__input"
                                    id="productQuantity"
                                    value={productQuantity}
                                    onChange={(e) => setProductQuantity(e.target.value)}
                                />
                            </div>
                            <button
                                className="button button--small"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>

                    {uploadProgress !== null && (
                        <div className="upload-progress">
                            Uploading image... {uploadProgress.toFixed(0)}%
                            <progress value={uploadProgress} max="100"></progress>
                        </div>
                    )}

                    <Link href={"/pages/inventory"} className="button button--flex button--small back__button">
                        Go Back
                    </Link>
                </div>



            </section>
        ) : (
            <Error statusCode={404}/>
        )
    )
}