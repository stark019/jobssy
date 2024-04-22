import React, { useState } from "react";
import { FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";
import { DiCssTricks } from "react-icons/di";
import "./employee.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import Navbar from "../common/navbar/Navbar";
import NavbarJobList from "../jobListing/navbarJobList/NavbarJobList";

export const Employee = () => {

  const { currUserId } = useSelector((state) => state.users.value); // use this to get the current user's id
  const [userData, setUserData] = useState();
  // const [isLoading, setIsLoading] = useState(true);
  let isLoading = true;
  useEffect(() => {
    onSnapshot(collection(db, 'users'), (users) => {
      let tempArr = [];
      users.forEach((user) => {
        if (user.id === currUserId) {
          setUserData(user.data());
        }
      });
    })

  }, [])
  console.log(userData);
  if (userData !== undefined) isLoading = false;
  const onButtonClick = (e) => {
    e.preventDefault();
    // using Java Script method to get PDF file
    // fetch('Olivia_Michel_Resume.pdf').then(response => {
    //   response.blob().then(blob => {
    //     // Creating new object of PDF file
    //     const fileURL = window.URL.createObjectURL(blob);
    //     // Setting various property values
    //     let alink = document.createElement('a');
    //     alink.href = fileURL;
    //     alink.download = 'Olivia_Resume.pdf';
    //     alink.click();
    //   })

    // }
    // )
  }


  return (
    isLoading ? <h2>Loading...</h2> : <>
    <NavbarJobList></NavbarJobList>
      <div className="container emp-profile">
        <form method="">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <img
                  src={userData.photo}
                  alt=""
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className="profile-head">
                <h5>{userData.name}</h5>
                <h6> {userData.title}</h6>
                <a href={userData.resume} target='_blank' className="btn btn-primary">
                    Download Resume
                  {/* <button className="btn btn-primary" onClick={onButtonClick}>
                  </button> */}
                </a>
                {/* <a href="Olivia_Michel_Resume.pdf">
                  <button>Download Resume</button>
                </a> */}

                {/* <button className="dontPrint" onClick={() => window.print()
                }> Capture as PDF </button>*/}
              </div>
            </div>

          </div>
          <div className="row">
            {/* //left side */}
            <div className="col-md-4">
              <div className="skils">
                <h4 className="text-center"> Skills</h4>
                <hr/>
                <p className="skils-info">
                  {userData.skill}
                </p>
              </div>
              <br />
              <div className="profile-work">
                <h4 className="text-center">My Social Profile</h4>
                <hr/>
                <a className="fa" target='_blank' href={userData.linkedin}>
                  <FaLinkedinIn />
                </a>

                <a className="fa" target='_blank' href={userData.twitter}>
                  <FaTwitter />
                </a>

                <a className="fa" target='_blank' href={userData.github}>
                  <FaGithub />
                </a>
              </div>
            </div>

            <div className="col-md-8 about-info">
              <div className="tab-content profile-tab">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      aria-current="page"
                      href="#"
                      role="tab"
                    >
                      About
                    </a>
                  </li>
                </ul>
                <br />
                <div className="row">
                  <div className="col-md-4">
                    <label>Email:</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.email}</p>
                  </div>
                  <div className="col-md-4">
                    <label>Contact:</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.phone}</p>
                  </div>
                  <div className="col-md-4">
                    <label>Education:</label>
                  </div>
                  <div className="col-md-6">
                    <p>
                      {userData.edu}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <label>Experience:</label>
                  </div>
                  <div className="col-md-6">
                    <p>
                      {userData.exp}+ Yrs
                    </p>
                  </div>
                  <div className="col-md-4">
                    <label>Projects:</label>
                  </div>
                  <div className="col-md-6">
                    <p>
                      {userData.proj}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <label>Languages:</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.lang}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Employee;