import React from 'react';
import Navbar from '../common/navbar/Navbar';
import './team.css';
import teamdata from './teamData';

const Team = () => {
    return (
        <>
          <Navbar></Navbar>
            <section className='container teamBox'>
                <div className='row '>
                   <hr/> 
                    <div className='col-md-6 col-sm-2 col-lg-12'>
                        <h2 className='text-black text-center my-5'>Meet Our Team Members</h2>
                    </div>
                    <hr/>
                    {
                        teamdata.map((values) => {
                            return (
                                <>
                                    <div class="col-12 col-sm-8 col-md-6 col-lg-4">
                                        <div class="card mb-5">
                                            <img class="card-img-top bg-dark" src="https://wallpapercave.com/wp/wp8063327.jpg" alt="Bologna" />
                                            <div class="card-body text-center">
                                                <img class="avatar rounded-circle" src={values.image} alt="Bologna" />
                                                <h4 class="card-title">{values.fname}</h4>
                                                <h6 class="card-subtitle mb-1 text-muted">{values.designation} </h6>
                                                <h9 class="card-subtitle mb-2 text-bold">{values.Batch}</h9>
                                                
                                                <p class="card-text">{values.Company} </p>
                                                <div className='social-icons my-2'>
                                                    <a className='text-dark'>
                                                        <i class="fa fa-brands fa-linkedin p-2"></i>
                                                    </a>
                                                    <a className='text-dark'>
                                                        <i class="fa fa-brands fa-twitter p-2"></i>
                                                    </a>
                                                    <a  className='text-dark'>
                                                        <i class="fa fa-brands fa-github p-2"></i>
                                                    </a>
                                                </div>
                                                {/* <h9 class="card-subtitle mb-2 text-bold">{values.Trainer}</h9> */}
                                            </div>
                                        </div>

                                    </div>


                                </>

                            )
                        })
                    }
                </div>
            </section>
        </>
    )
}

export default Team;

/*



*/