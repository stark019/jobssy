import React, { useState, useEffect } from "react"
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import "./ProfileForm.css"
import { useSelector } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";
import Navbar from "../common/navbar/Navbar";
import { FaOptinMonster } from "react-icons/fa";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import NavbarJobList from "../jobListing/navbarJobList/NavbarJobList";
const ProfileForm = () => {
    const { currUserId } = useSelector((state) => state.users.value);

    const [photo, setPhoto] = useState();
    const [name, setName] = useState();
    const [title, setTitle] = useState();
    const [phone, setPhone] = useState();
    const [exp, setExp] = useState();
    const [edu, setEdu] = useState();
    const [proj, setProj] = useState();
    const [skill, setSkill] = useState();
    const [lang, setLang] = useState();
    const [linkedin, setLinkedin] = useState();
    const [twitter, settwitter] = useState();
    const [github, setGithub] = useState();
    const [resume, setResume] = useState();
    useEffect(() => {
        onSnapshot(collection(db, 'users'), (users) => {
            // let tempArr = [];
            users.forEach((user) => {
                if (user.id === currUserId) {
                    setPhoto(user.data().photo);
                    setName(user.data().name);
                    setTitle(user.data().title);
                    setPhone(user.data().phone);
                    setExp(user.data().exp);
                    setEdu(user.data().edu);
                    setProj(user.data().proj);
                    setSkill(user.data().skill);
                    setLang(user.data().lang);
                    setLinkedin(user.data().linkedin);
                    settwitter(user.data().twitter);
                    setGithub(user.data().github);
                    setResume(user.data().resume);
                }
            });
        })

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const profileDetails = {
            photo: photo,
            name: name,
            title: title,
            phone: phone,
            exp: exp,
            edu: edu,
            proj: proj,
            skill: skill,
            lang: lang,
            linkedin: linkedin,
            twitter: twitter,
            github: github,
            resume: resume
        }
        console.log(profileDetails);

        updateDoc(doc(db, 'users', currUserId), profileDetails).then((res) => {
            console.log("updated");
        }).catch((err)=>{
            console.log(err.message);
        })

    }
    return (
       <>
       <NavbarJobList></NavbarJobList>
       <div className="updateprofilebox">
       <div className="container mt-8">
        <section className='d-flex justify-content-between'>
          <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
            <h3 className='text-center col-lg-6'>Update Job Details</h3>
            <Form >
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <label htmlFor="photo">Photograph</label>
                <Form.Control type="text" name="photo" onChange={(e) => setPhoto(e.target.value)} value={photo} id="job_id" />
              </Form.Group>
               <Form.Group className="mb-3 col-lg-6">
               <label htmlFor="name">Name</label>
                <Form.Control type="text" name="name" onChange={(e) => setName(e.target.value)} value={name} id="name" />
               </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
              <label htmlFor="text">Job Title</label>
                                <Form.Control type="text" name="email" onChange={(e) => setTitle(e.target.value)}
                                    value={title} id="title" />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
              <label htmlFor="phone">Phone</label>
                                <Form.Control type="text" name="phone" onChange={(e) => setPhone(e.target.value)}
                                    value={phone} id="phone" />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
              <label htmlFor="experience">Experience</label>
                                <Form.Control type="text" name="experience" onChange={(e) => setExp(e.target.value)}
                                    value={exp} id="experience" />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
              <label htmlFor="education">Education</label>
                                <Form.Control type="text" name="education" onChange={(e) => setEdu(e.target.value)}
                                    value={edu} id="education" />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
              <label htmlFor="projects">Projects</label>
                                <Form.Control type="text" name="projects" onChange={(e) => setProj(e.target.value)}
                                    value={proj} id="projects" />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
              <label htmlFor="skills">Skills</label>
                                <Form.Control type="text" name="skills" onChange={(e) => setSkill(e.target.value)}
                                    value={skill} id="skills" />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
              <label htmlFor="languages">Languages</label>
                                <Form.Control type="text" name="languages" onChange={(e) => setLang(e.target.value)}
                                    value={lang} id="languages" />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
              <label htmlFor="linkedin">LinkedIn</label>
                                <Form.Control type="text" name="linkedin" onChange={(e) => setLinkedin(e.target.value)}
                                    value={linkedin} id="linkedin" />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
              <label htmlFor="tweeter">Twitter</label>
                                <Form.Control type="text" name="tweeter" onChange={(e) => settwitter(e.target.value)}
                                    value={twitter} id="tweeter" />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
              <label htmlFor="github">Github</label>
                                <Form.Control type="text" name="github" onChange={(e) => setGithub(e.target.value)}
                                    value={github} id="github" />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
              <label htmlFor="resume">Resume (Google drive link)</label>
                                <Form.Control type="text" name="resume" onChange={(e) => setResume(e.target.value)}
                                    value={resume} id="resume" />
              </Form.Group>
              
              <Button variant="primary" className='col-lg-6'  onClick={handleSubmit} style={{ background: "#4B6587" }} type="submit">
                Update Profile
              </Button>
            </Form>
            
          </div>
          
        </section>
        </div>
       </div>

       </>
    )
}

export default ProfileForm