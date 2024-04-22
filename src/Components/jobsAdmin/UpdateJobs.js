import React, { useState, useEffect } from "react"
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import "./UpdateJobs.css"
import { useSelector } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Navbar from "../admin-panel/adminComponents/navbar/Navbar";
import Sidebar from "../admin-panel/adminComponents/sidebar/Sidebar";
const UpdateJobs = () => {
    const { currUserId } = useSelector((state) => state.users.value);
    const param = useParams();
    const [company, setCompany] = useState();
    const [ctc, setCtc] = useState();
    const [desc, setDesc] = useState();
    const [exp, setExp] = useState();
    const [location, setLocation] = useState();
    const [title, setTitle] = useState();
    
    
    useEffect(() => {
        onSnapshot(collection(db, 'jobs'), (users) => {
            // let tempArr = [];
            users.forEach((user) => {
                if (user.id === param.id) {
                    setTitle(user.data().title);
                    setCompany(user.data().company);
                    setCtc(user.data().ctc);
                    setDesc(user.data().desc);
                    setExp(user.data().exp);
                    setLocation(user.data().location);    
                }
            });
        })

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const jobDetails = {
            title: title,
            exp: exp,
            company:company,
            ctc:ctc,
            desc:desc,
            location:location
        }

        updateDoc(doc(db, 'jobs', param.id), jobDetails).then((res) => {
            console.log("updated");
        }).catch((err)=>{
            console.log(err.message);
        })

    }
    return (
       <>
       <div className="updateJobHome">
        <Navbar></Navbar>
        <div className="updateJobContainer">
          <Sidebar></Sidebar>
        <div className="container mt-8 updateJobBox">
        <section className='d-flex justify-content-between'>
          <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
            <h3 className='text-center col-lg-6'>Update Job Details</h3>
            <Form >
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <label htmlFor="text">Job Title</label>
                <Form.Control type="text" name="email" onChange={(e) => setTitle(e.target.value)} value={title} id="title" />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <label htmlFor="text">Company</label>
            <Form.Control type="text" name="email" onChange={(e) => setCompany(e.target.value)} value={company} id="company" />
              </Form.Group>



              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
              <label htmlFor="text">Description</label>
                                <Form.Control type="text" name="email" onChange={(e) => setDesc(e.target.value)}
                                    value={desc} id="desc" />
                
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
              <label htmlFor="text">Experience</label>
            <Form.Control type="text" name="email" onChange={(e) => setExp(e.target.value)} value={exp} id="exp" />
                
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
              <label htmlFor="text">CTC</label>
                                <Form.Control type="text" name="email" onChange={(e) => setCtc(e.target.value)}
                                    value={ctc} id="ctc" />
                
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
              <label htmlFor="text">Location</label>
                                <Form.Control type="text" name="email" onChange={(e) => setLocation(e.target.value)}
                                    value={location} id="location" />
                
              </Form.Group>
              
              <Button variant="primary" className='col-lg-6 adminButtons'  onClick={handleSubmit} style={{ background: "#4B6587" }} type="submit">
                Update Job
              </Button>
            </Form>
            
          </div>
          
        </section>
        </div>
        </div>
       </div>
       </>

         
    )
}

export default UpdateJobs