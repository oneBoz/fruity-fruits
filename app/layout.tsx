"use client"

import "./globals.css";
import NavBar from "./components/ui/NavBar";
import Footer from "./components/ui/Footer";

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
        {/*==================== HEADER ====================*/}
        <header className="header" id="header">
            <NavBar/>
        </header>
        {children}
        <Footer/>
        </body>
        </html>
    );
}
