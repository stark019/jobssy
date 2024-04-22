import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import './home.css';
import jobs from './dummyjobs';
import JobList from './spectator_view/JobList';
import Navbar from '../common/navbar/Navbar';
import Footer from '../common/footer/Footer';

const Home = () => {
  return (
    <>
    <Navbar></Navbar>
      <section class="bg-home">
        <div class="home-center">
          <div class="home-desc-center">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-9">
                  <div class="home-title text-center textColor">
                    <h5 class="small-title text-uppercase f-17 mb-4 textColor">Discover Joobsy Today</h5>
                    <h1 class="mb-4">Find your New Job Easiest Way With Joobsy</h1>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className='secondSection'>
        <JobList></JobList>

      </section>

      <section class="secondSection">
        <div >
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="title text-center mb-4">
                <h4>Popular Category</h4>
                <p class="text-muted mb-1">minima veniam quis nostrum exercitationem Quis autem vel eum iure</p>
                <div class="title-icon position-relative">
                  {/* <i class="mdi mdi-chevron-down position-relative h3 text-custom bg-white"></i> */}
                  <i class="fa fa-solid fa-chevron-down position-relative h3 text-custom bg-white"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-3 col-md-6">
              <div class="popu-category-box bg-light rounded text-center mt-4 p-4">
                <div class="popu-category-icon mb-3">
                  {/* <i class="mdi mdi-account h2 text-custom"></i> */}
                  <i class="fa fa-solid fa-user h2 text-custom"></i>
                </div>
                <div class="popu-category-content">
                  <h5 class="f-18 mb-4"><a href="" class="text-dark">Developer</a></h5>
                  <p class="text-custom mb-0 rounded">780 Jobs</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="popu-category-box bg-light rounded text-center mt-4 p-4">
                <div class="popu-category-icon mb-3">
                  {/* <i class="mdi mdi-desktop-classic h2 text-custom"></i> */}
                  <i class="fa fa-solid fa-desktop h2 text-custom"></i>
                </div>
                <div class="popu-category-content">
                  <h5 class="f-18 mb-4"><a href="" class="text-dark">Technology</a></h5>
                  <p class="text-custom mb-0 rounded">1270 Jobs</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="popu-category-box bg-light rounded text-center mt-4 p-4">
                <div class="popu-category-icon mb-3">
                  {/* <i class="mdi mdi-bank h2 text-custom"></i> */}
                  <i class="fa fa-sharp fa-solid fa-briefcase  h2 text-custom"></i>
                </div>
                <div class="popu-category-content">
                  <h5 class="f-18 mb-4"><a href="" class="text-dark">Government</a></h5>
                  <p class="text-custom mb-0 rounded">2024 Jobs</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="popu-category-box bg-light rounded text-center mt-4 p-4">
                <div class="popu-category-icon mb-3">
                <i class="fa fa-sharp fa-solid fa-globe h2 text-custom"></i>
                </div>
                <div class="popu-category-content">
                  <h5 class="f-18 mb-4"><a href="" class="text-dark">All Jobs</a></h5>
                  <p class="text-custom mb-0 rounded">5000+ Jobs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


     

      {/* ------------------HOW THIS WEBSITE WORKSSS----------------------------------------------- */}

      <section class="secondSection">
        <div >
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-6">
                        <div class="title text-center mb-4">
                            <h4>How It Work</h4>
                            <p class="text-muted mb-1">minima veniam quis nostrum exercitationem Quis autem vel eum iure</p>
                            <div class="title-icon position-relative">
                            <i class="fa fa-solid fa-chevron-down position-relative h3 text-custom bg-white"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <div class="how-it-work-box bg-light p-4 mt-4 text-center">
                            <div class="how-it-work-img mb-4">
                                <img src="https://themesdesign.in/joobsy/images/how-it-work/img-1.png" alt="" class="img-fluid mx-auto d-block"/>
                                <p>1</p>
                            </div>
                            <div>
                                <h5 class="f-18">Register an account</h5>
                                <p class="f-14 text-muted">Donec pede justo fringilla vel aliquet nec vulputate eget arcu. In enim justo rhoncus ut a, venenatis vitae justo.</p>
                                <a href="#" class="text-custom">Read more <i class="mdi mdi-chevron-right"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="how-it-work-box bg-light p-4 mt-4 text-center">
                            <div class="how-it-work-img mb-4">
                                <img src="https://themesdesign.in/joobsy/images/how-it-work/img-2.png" alt="" class="img-fluid mx-auto d-block"/>
                                <p>2</p>
                            </div>
                            <div>
                                <h5 class="f-18">Search your job</h5>
                                <p class="f-14 text-muted">Aliquam lorem ante dapibus in, viverra feugiatquis a tellus. Phasellus viverra nulla ut metus varius Quisque rutrum.</p>
                                <a href="#" class="text-custom">Read more <i class="mdi mdi-chevron-right"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="how-it-work-box bg-light p-4 mt-4 text-center">
                            <div class="how-it-work-img mb-4">
                                <img src="https://themesdesign.in/joobsy/images/how-it-work/img-3.png" alt="" class="img-fluid mx-auto d-block"/>
                                <p>3</p>
                            </div>
                            <div>
                                <h5 class="f-18">Apply for job</h5>
                                <p class="f-14 text-muted">Nullam dictum felis eu pede mollis pretiumetus Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.</p>
                                <a href="#" class="text-custom">Read more <i class="mdi mdi-chevron-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/*----------------------------------------------------------------------ANOTHER SECTION--PLEASE DO NOT TOUCH------------------------------------- */}
    </>

  )
}

export default Home