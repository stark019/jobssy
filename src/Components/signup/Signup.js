import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './signup.css';
import Signimg from './Signimg'
import { useSignup } from '../../hooks/useSignup';
import { Navigate } from 'react-router-dom';
import Navbar from '../common/navbar/Navbar';


const Signup = () => {
  
  const { signup } = useSignup(); // using hook
  const [inputval, setInputval] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
  }
  )
  const [data, setData] = useState([]);
  const [role, setRole] = useState('');
  console.log(inputval)


  const getdata = (e) => {
    const { value, name } = e.target;

    setInputval(() => {
      return {
        ...inputval,
        [name]: value
      }
    })

  }
  const addData = (e) => {
    e.preventDefault();
    const { name, email, password, confirmpassword } = inputval;
   

    if (name === "") {
      alert("name field is required")
    } else if (email === "") {
      alert("email field is req")
    } else if (!email.includes("@")) {
      alert("please enter valid email address")
    } else if (password === "") {
      alert("please enter the password")
    } else if (password.length < 5) {
      alert("password length must be greater than 5")
    } else if (confirmpassword === "") {
      alert("please enter the field confirm password")
    }

    else if (confirmpassword !== password) {
      alert("Confirm password & password must be equal")
    }

    else {
      console.log("data added sucessfully")
      // localStorage.setItem("user",JSON.stringify([...data,inputval]));
      signup(email, password, role, name)
    }
  }

  const handleRole = (e) => {
    console.log(e.target.value);
    setRole(e.target.value);
  }

  return (
    <>
    <Navbar></Navbar>
      <div className="container mt-8 signup">
        <section className='d-flex justify-content-between'>
          <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
            <h3 className='text-center col-lg-6'>Sign Up</h3>
            <Form >
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                <Form.Control type="text" onChange={getdata} name='name' placeholder="Enter Your Name" />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                <Form.Control type="email" onChange={getdata} name='email' placeholder="Enter email" />
              </Form.Group>



              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">

                <Form.Control type="password" onChange={getdata} name='password' placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">

                <Form.Control type="password" onChange={getdata} name='confirmpassword' placeholder="Confirm Password" />
              </Form.Group>
              <select className='role' onChange={handleRole}>
                <option value="user">Select role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <br></br>
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

export default Signup