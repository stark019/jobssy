import { useState } from "react"
import { auth } from "../firebase/config"
import {
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const signup = async (email, password, role, name) => {
        setError(null);
        setIsPending(true);

        try {
            // signup user
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log(res.user);

            if(!res) {
                throw new Error('Could not complete signup');
            }
            console.log(res);

            // adding data to the users collection
            if(role === 'user') {
                await addDoc(collection(db, "users"), {
                    name: name,
                    role: role,
                    email: email,
                    photo: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
                    phone: 'Update details',
                    proj: 'Update details',
                    resume: 'Update details',
                    skill: 'Update details',
                    title: 'Update details',
                    twitter: 'Update details',
                    linkedin: 'Update details',
                    github: 'Update details',
                    exp: 'Update details',
                    lang: 'Update details',
                    edu: 'Update details'
                });
            } else {
                await addDoc(collection(db, "users"), {
                    name: name,
                    role: role,
                    email: email,
                });
            }

            setIsPending(false);
            setError(null);
        } catch (err) {
            console.log(err.message);
            setError(err.message);
            setIsPending(false);
        }
    }

    return { error, isPending, signup }
}