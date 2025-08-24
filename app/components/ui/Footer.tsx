import Link from "next/link";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__bg">
                <div className="footer__container container grid">
                    <div>
                        <h1 className="footer__title">FruityFruits</h1>
                        <span className="footer__subtitle">Your best bet</span>
                    </div>

                    <ul className="footer__links">
                        <li>
                            <Link href="/" className="footer__link">Store</Link>
                        </li>
                        <li>
                            <Link href="/pages/cart" className="footer__link">Cart</Link>
                        </li>
                    </ul>

                    <div className="footer__socials">
                        <a href="https://www.facebook.com/" target="_blank" className="footer__social">
                            <i className="uil uil-facebook-f"></i>
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" className="footer__social">
                            <i className="uil uil-instagram"></i>
                        </a>
                        <a href="https://twitter.com/" target="_blank" className="footer__social">
                            <i className="uil uil-twitter-alt"></i>
                        </a>
                    </div>
                </div>

                <p className="footer__copy">&#169; oneBoz. All rights reserved</p>
            </div>
        </footer>
    )
}

export default Footer;