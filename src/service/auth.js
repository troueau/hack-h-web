import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/configFirebase";



export const signIn = (user) => {
    return signInWithEmailAndPassword(auth, user.email, user.password);

}