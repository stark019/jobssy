import { useState } from "react"
import { auth } from "../firebase/config"
import { signInWithEmailAndPassword } from "firebase/auth";

export const useSignin = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const signin = async (email, password) => {
        setError(null);
        setIsPending(true);

        try {
            // signup user
            const res = await signInWithEmailAndPassword(auth, email, password);
            console.log(res.user);

            if(!res) {
                throw new Error('Could not complete signin');
            }
            console.log(res);

            setIsPending(false);
            setError(null);
        } catch (err) {
            // console.log(err.message);
            setError(err.message);
            setIsPending(false);
            return err.message;
        }
    }

    return { error, isPending, signin }
}