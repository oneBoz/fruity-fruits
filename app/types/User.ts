export default interface User {
    uid: string;
    userName: string;
    email: string;
    role: "customer" | "admin";
}