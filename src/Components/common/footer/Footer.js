import React from 'react'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './footer.css'

//notify my user
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Footer = () => {
    const form = useRef()

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_zy5pejq', 'template_vdkbbji', form.current, '63MCp6I3S1db38w6N')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

        e.target.reset();
    };

    //notify my user
    const showToast = () => {
        toast.success(" Thanks for subscribing!! ")
    };

    return (
        <>
            <footer id="footer-section">
                <div className="container resize">
                    <div className="footer-cta pt-5 pb-5">
                        <div className="row">
                            <div className="col-xl-4 col-md-4 mb-30">
                                <div className="single-cta">
                                    <i className="fa fa-map-marker-alt"></i>
                                    <div className="cta-text">
                                        <h4>Find us</h4>
                                        <span>Plot No.7, Oxygen Business Park SEZ, Tower, 3, Noida-Greater Noida Expy, Sector 144, Noida, Uttar Pradesh 201304</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-4 mb-30">
                                <div className="single-cta">
                                    <i className="fa fa-phone"></i>
                                    <div className="cta-text">
                                        <h4>Call us</h4>
                                        <span> 9876453829</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-4 mb-30">
                                <div className="single-cta">
                                    <i className=" fa fa-solid fa-envelope"></i>
                                    {/* <i className="far fa-envelope-open"></i> */}
                                    <div className="cta-text">
                                        <h4>Mail us</h4>
                                        <span>mail@info.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-content pt-5 pb-5">
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 mb-50">
                                <div className="footer-widget">
                                    <div className="footer-logo">
                                        {/* logo image */}
                                    </div>
                                    <div className="footer-text">
                                        <p>Lorem ipsum dolor sit amet, consec tetur adipisicing elit, sed do eiusmod tempor incididuntut consec tetur adipisicing
                                            elit,Lorem ipsum dolor sit amet.</p>
                                    </div>
                                    <div className="footer-social-icon">
                                        <span>Follow us</span>
                                        <a href="#"><i className="fa fa-facebook-f facebook-bg"></i></a>
                                        <a href="#"><i className="fa fa-twitter twitter-bg"></i></a>
                                        <a href="#"><i class="fa fa-brands fa-google-plus-g"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                                <div className="footer-widget">
                                    <div className="footer-widget-heading">
                                        <h3>Useful Links</h3>
                                    </div>
                                    <ul>
                                        {/* <li><a href="#">Home</a></li>
                                <li><a href="#">about</a></li> */}
                                        {/* <li><a href="#">services</a></li> */}
                                        {/* <li><a href="#">portfolio</a></li> */}

                                        <li><a href="#">About us</a></li>
                                        <li><a href="#">Our Services</a></li>
                                        {/* <li><a href="#">Expert Team</a></li> */}
                                        <li><a href="#">Contact us</a></li>
                                        <li><a href="#">Latest News</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                                <div className="footer-widget" id="pricing">
                                    <div className="footer-widget-heading">
                                        <h3>Subscribe</h3>
                                    </div>
                                    <div className="footer-text mb-25">
                                        <p>Dont miss to subscribe to get job updates, kindly fill the form below.</p>
                                    </div>
                                    <div className="subscribe-form">
                                        <form ref={form}
                                            onSubmit={sendEmail}
                                        >
                                            <input
                                                type="email"
                                                placeholder='Email'
                                                name='user_email'
                                                required />
                                            <button type='submit' onClick={showToast}><i class="fa fa-brands fa-telegram"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </footer>
            <ToastContainer />
        </>
    )
}

export default Footer
