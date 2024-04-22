import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Signimg from '../signup/Signimg'
import './login.css';
import { useDispatch } from 'react-redux';
import {setUserId, setUserRole} from '../../useSlice';
import { useSignin } from '../../hooks/useSignin'; // sign in hook
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Navbar from '../common/navbar/Navbar'

//notify my user
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { signin, isPending, error } = useSignin();
    const [inputval, setInputval] = useState({
        email: "",
        password: ""
    })

    const [data, setData] = useState([]);
    console.log(inputval);

    const getdata = (e) => {
        // console.log(e.target.value);


        const { value, name } = e.target;
        // console.log(value,name);


        setInputval(() => {
            return {
                ...inputval,
                [name]: value
            }
        })

    }

    const addData = async (e) => {
        e.preventDefault();

        // const getuserArr = localStorage.getItem("useryoutube");
        // console.log(getuserArr);

        const { email, password } = inputval;
        if (email === "") {
            alert('email field is requred', {
                position: "top-center",
            });
        } else if (!email.includes("@")) {
            alert('plz enter valid email addres', {
                position: "top-center",
            });
        } else if (password === "") {
            alert('password field is requred', {
                position: "top-center",
            });
        } else if (password.length < 5) {
            alert('password length greater five', {
                position: "top-center",
            });
        } else {

            /* // Using some other logic
            if (getuserArr && getuserArr.length) {
                const userdata = JSON.parse(getuserArr);
                const userlogin = userdata.filter((el, k) => {
                    return el.email === email && el.password === password
                });

                if (userlogin.length === 0) {
                    alert("invalid details")
                } else {
                    console.log("user login succesfulyy");

                    localStorage.setItem("user_login", JSON.stringify(userlogin))


                }
            }
            */

        

        try {
            const status = await signin(email, password);
            if(status) {
                console.log(status);
            } else {
                
                console.log( "successfully logged in");
                const q = query(collection(db, 'users'), where('email', '==', email));
                const res = await getDocs(q); // return the matching document (User)
                if (res.docs[0].data().role === 'admin') {
                    dispatch(setUserRole({role: 'admin'}));
                    dispatch(setUserId({id: res.docs[0].id}))
                    console.log('navigate to admin pages');
                    navigate('/adminpanel') // intended page to route (admin dashboard )
                   
                } else {
                    dispatch(setUserRole({role: 'user'}));
                    dispatch(setUserId({id: res.docs[0].id}))
                    console.log('navigate to user pages');
                    navigate('/explorejobs') // intended page to route (user dashboard)
                }
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    }

    return (
        <>
        <Navbar></Navbar>
            <div className="container loginContainer">
                <section className='d-flex justify-content-between'>
                    <div className="left_data mt-3 p-5" style={{ width: "100%" }}>
                        <h3 className='text-center col-lg-6'>Sign in</h3>
                        <Form >

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                                <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">

                                <Form.Control type="password" name='password' onChange={getdata} placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" className='col-lg-6' onClick={addData} style={{ background: "#4B6587" }} type="submit">
                                Submit
                            </Button>
                        </Form>

                    </div>
                    <Signimg></Signimg>
                </section>

            </div>
            
        </>
    )
}

export default Login