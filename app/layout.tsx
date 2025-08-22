import "./globals.css";
import NavBar from "./components/ui/NavBar";
import Footer from "./components/ui/Footer";
import {CartProvider} from "@/app/contexts/CartContext";
import {UserAuthContextProvider} from "@/app/contexts/UserContext";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Fruity Fruits",
    description: "Fresh fruits delivered to your door",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
        <head>
            <title>Fruity Fruits</title>

            {/*UNICONS*/}
            <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.2.0/css/line.css"/>
        </head>
        <body>
            <UserAuthContextProvider>
                <CartProvider>
                    <header className="header" id="header">
                        <NavBar/>
                    </header>
                    {children}
                    <Footer/>
                </CartProvider>
            </UserAuthContextProvider>
        </body>
        </html>
    );
}
