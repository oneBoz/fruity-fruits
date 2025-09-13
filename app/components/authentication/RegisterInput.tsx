"use client"
import {Snackbar} from "@mui/joy";
import {useState} from "react";
import {executeRegisterWithEmailAndPassword} from "@/app/firebase/firebaseAuth";
import {FirebaseError} from "@firebase/app";

const RegisterInput = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSubmit = async () => {
        console.log("Email:", email);
        console.log("Password:", password);
        console.log(isOpen)
        if (email.trim() == "" || password.trim() == "") {
            handleRegistrationError("missing inputs");
            setIsOpen(true);
        } else if (password != confirmPassword) {
            handleRegistrationError("mismatch passwords");
            setIsOpen(true);
        } else if (userName.trim() == "" || email.trim() == "" || password.trim() == "" ) {
            handleRegistrationError("missing inputs")
            setIsOpen(true);
        } else {
            try {
                // Add the user to firebase auth
                await executeRegisterWithEmailAndPassword(userName, email, password, "customer");
                setErrorMessage("");
                setRegisterSuccess(true);
                setIsOpen(true);
                // Navigate back to the login page
            } catch (registerError) {
                if (registerError instanceof FirebaseError) {
                    handleRegistrationError(registerError.code);
                } else {
                    handleRegistrationError("unknown error");
                }
                setIsOpen(true)
            }
        }
    };

    const handleRegistrationError = (error: string) => {
        switch (error) {
            case "auth/email-already-in-use":
                setErrorMessage("Email is already in use");
                break;
            case "auth/weak-password":
                setErrorMessage("Password is too weak, it must be at least 6 characters long");
                break;
            case "auth/invalid-email":
                setErrorMessage("Invalid email");
                break;
            case "mismatch passwords":
                setErrorMessage("Passwords do not match");
                break;
            case "missing inputs":
                setErrorMessage("Please do not leave any fields empty");
                break;
            default:
                setErrorMessage("An error occurred, please try again later");
        }
    }

    return (
        <main>
            <div className="login container grid">
                <h2 className="section__title">Sign Up</h2>
                <form
                    className="login__form grid"
                    onSubmit={handleSubmit}
                >
                    <div className="login__inputs grid">
                        <div className="login__content">
                            <label className="login__label" htmlFor={"name"}>Name</label>
                            <input
                                type="text"
                                className="login__input"
                                id="name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>

                        <div className="login__content">
                            <label className="login__label" htmlFor={"email"}>Email</label>
                            <input
                                type="text"
                                className="login__input"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="login__content">
                            <label className="login__label" htmlFor={"password"}>Password</label>
                            <input
                                type="text"
                                className="login__input"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="login__content">
                            <label className="login__label" htmlFor={"confirmPassword"}>Confirm Password</label>
                            <input
                                type="text"
                                className="login__input"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
                    color={registerSuccess? "success" : "danger"}
                    variant="soft"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                    {registerSuccess? "register success!" : errorMessage}
                </Snackbar>
            </div>
        </main>

    )
}

export default RegisterInput;