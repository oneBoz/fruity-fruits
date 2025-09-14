"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
import {useUser} from "@/app/contexts/UserContext";
import {executeSignOut} from "@/app/firebase/firebaseAuth";
import {DialogTitle, Modal, ModalDialog} from "@mui/joy";
import {useRouter} from "next/navigation";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { userName, isLoggedIn, isOwner } = useUser();

    const handleToggle = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const handleLinkClick = () => setIsOpen(false);

    const darkTheme = 'dark-theme'
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        // Load saved theme
        const savedTheme = localStorage.getItem("selected-theme") as "light" | "dark" | null;
        if (savedTheme) {
            setTheme(savedTheme);
            document.body.classList.toggle(darkTheme, savedTheme === "dark");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);

        // Toggle the class on <body>
        document.body.classList.toggle(darkTheme, newTheme === "dark");

        // Save preference
        localStorage.setItem("selected-theme", newTheme);
    };

    const router = useRouter();

    return (
        <nav className="nav container">
            <Link href="/" className="nav__logo">FruityFruits</Link>

            {/* Menu */}
            <div className={`nav__menu ${isOpen ? "show-menu" : ""}`} id="nav-menu">
                <ul className="nav__list grid">
                    {isLoggedIn && isOwner && (
                        <li className="nav__item">
                            <Link href="/pages/sales" className="nav__link" onClick={handleLinkClick}>
                                <i className="uil uil-parcel nav__icon"></i> Sales
                            </Link>
                        </li>
                    )}
                    {isLoggedIn && isOwner && (
                        <li className="nav__item">
                            <Link href="/pages/inventory" className="nav__link" onClick={handleLinkClick}>
                                <i className="uil uil-parcel nav__icon"></i> Inventory
                            </Link>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li className="nav__item">
                            <Link href="/pages/orderHistory" className="nav__link" onClick={handleLinkClick}>
                                <i className="uil uil-parcel nav__icon"></i> Order history
                            </Link>
                        </li>
                    )}
                    <li className="nav__item">
                        <Link href="/pages/product" className="nav__link" onClick={handleLinkClick}>
                            <i className="uil uil-box nav__icon"></i> Products
                        </Link>
                    </li>
                    {!isLoggedIn && (
                        <li className="nav__item">
                            <Link href="/pages/register" className="nav__link" onClick={handleLinkClick}>
                                <i className="uil uil-message nav__icon"></i> Register
                            </Link>
                        </li>
                    )}

                    {!isLoggedIn && (
                        <li className="nav__item">
                            <Link href="/pages/login" className="nav__link" onClick={handleLinkClick}>
                                <i className="uil uil-message nav__icon"></i> Login
                            </Link>
                        </li>
                    )}
                    <li className="nav__item">
                        <Link href="/pages/cart" className="nav__link" onClick={handleLinkClick}>
                            <i className="uil uil-shopping-bag nav__icon"></i> Cart
                        </Link>
                    </li>
                    {isLoggedIn && (
                        <li className="nav__item">
                            <Link href="#Profile" className="nav__link" onClick={() => setIsModalOpen(true)}>
                                <i className="uil uil-user nav__icon"></i> {userName}
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Close button */}
                <i
                    className="uil uil-times nav__close"
                    id="nav-close"
                    onClick={handleClose}
                ></i>
            </div>

            {/* Right side buttons */}
            <div className="nav__btns">
                {/* Theme change button */}
                <i
                    className={`uil ${theme === "dark" ? "uil-sun" : "uil-moon"} change-theme`} id="theme-button"
                    onClick={toggleTheme}
                >

                </i>

                {/* Toggle button */}
                <div
                    className="nav__toggle"
                    id="nav-toggle"
                    onClick={() => handleToggle()}
                >
                    <i className="uil uil-apps"></i>
                </div>
            </div>
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <ModalDialog>
                    <DialogTitle sx={{
                        textAlign: "center",
                        alignItems: "center"
                    }}>{userName}</DialogTitle>
                    <button
                        className="button button--small"
                        onClick={() => {
                            executeSignOut();
                            setIsModalOpen(false);
                            router.push("/pages/login");
                        }}
                    >
                        Sign out
                    </button>
                </ModalDialog>
            </Modal>
        </nav>
    );
};

export default NavBar;
