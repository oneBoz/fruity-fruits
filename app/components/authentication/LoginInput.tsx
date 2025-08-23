"use client"
import {Snackbar} from "@mui/joy";
import {useState} from "react";
import {executeSignInWithEmailAndPassword} from "@/app/firebase/firebaseAuth";
import {FirebaseError} from "@firebase/app";

const LoginInput = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogInSuccess, setIsLogInSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async () => {
        if (email.trim() == "" || password.trim() == "") {
            handleLoginError("missing inputs");
        } else {
            try {
                await executeSignInWithEmailAndPassword(email, password);
                setErrorMessage("");
                setIsLogInSuccess(true);
                setIsOpen(true);
                window.location.href="/";
            } catch (loginError) {
                if (loginError instanceof FirebaseError) {
                    handleLoginError(loginError.code);
                } else {
                    handleLoginError("unknown error");
                }
                setIsOpen(true);
            }
        }
    };

    const handleLoginError = (error: string) => {
        switch (error) {
            case "auth/user-not-found":
                setErrorMessage("User not found");
                break;
            case "auth/invalid-credential":
                setErrorMessage("Invalid email or password");
                break;
            case "auth/user-disabled":
                setErrorMessage("User account has been disabled");
                break;
            case "auth/too-many-requests":
                setErrorMessage("Too many requests, please try again later");
                break;
            case "auth/invalid-email":
                setErrorMessage("Invalid email");
                break;
            case "missing inputs":
                setErrorMessage("Please enter an email and a password");
                break;
            default:
                setErrorMessage("An error occurred, please try again later");
        }
    }

    return (
        <main>
            <div className="login container grid">
                <h2 className="section__title">Log In</h2>
                <form
                    className="login__form grid"
                    onSubmit={handleSubmit}
                >
                    <div className="login__inputs grid">
                        <div className="login__content">
                            <label className="login__label">Email</label>
                            <input
                                type="text"
                                className="login__input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="login__content">
                            <label className="login__label">Password</label>
                            <input 
                                type="text"
                                className="login__input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </form>
                <button className="button button--small" onClick={handleSubmit}>
                    Submit
                </button>
                <Snackbar
                    open={isOpen}
                    autoHideDuration={2000}
                    onClose={() => {setIsOpen(false)}}
                    color={isLogInSuccess? "success" : "danger"}
                    variant="soft"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                    {isLogInSuccess? "log in success!" : errorMessage}
                </Snackbar>
            </div>
        </main>

    )
}

export default LoginInput;