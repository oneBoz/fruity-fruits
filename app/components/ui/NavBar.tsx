"use client";

import { useState } from "react";
import Link from "next/link";
import {useUser} from "@/app/contexts/UserContext";
import {executeSignOut} from "@/app/firebase/firebaseAuth";
import {DialogTitle, Modal, ModalDialog} from "@mui/joy";

const NavBar = () => {
    // menu open/close state
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { userName, isLoggedIn } = useUser();

    // toggle menu
    const handleToggle = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    // close menu when clicking a nav link
    const handleLinkClick = () => setIsOpen(false);

    return (
        <nav className="nav container">
            <a href="#" className="nav__logo">FruityFruits</a>

            {/* Menu */}
            <div className={`nav__menu ${isOpen ? "show-menu" : ""}`} id="nav-menu">
                <ul className="nav__list grid">
                    <li className="nav__item">
                        <Link href="/#store" className="nav__link" onClick={handleLinkClick}>
                            <i className="uil uil-estate nav__icon"></i> Store
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
                            <Link href="/pages/pastTransaction" className="nav__link" onClick={handleLinkClick}>
                                <i className="uil uil-parcel nav__icon"></i> View orders
                            </Link>
                        </li>
                    )}
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
                <i className="uil uil-moon change-theme" id="theme-button"></i>

                {/* Toggle button */}
                <div
                    className="nav__toggle"
                    id="nav-toggle"
                    onClick={handleToggle}
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
                        className="button button--small register__button"
                        onClick={() => {
                            setIsModalOpen(false);
                            window.location.href = "/pages/register";
                        }}
                    >
                        Register
                    </button>
                    <button
                        className="button button--small"
                        onClick={() => {
                            setIsModalOpen(false);
                            executeSignOut();
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
