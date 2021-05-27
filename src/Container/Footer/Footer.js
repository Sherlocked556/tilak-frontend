import React from 'react'
import './Footer.css';
import { FaPhoneAlt, FaFacebookF, FaInstagram } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { GoLocation } from "react-icons/go";
import { BiCopyright } from 'react-icons/bi';
import { Link } from 'react-router-dom';
function Footer() {
    return (
        <footer>
            <div className="footer">
                <div className="firstbox">
                    <div className="f1"><b>Want latest updates? Just subscribe</b>
                        <div className="emaildiv">
                            <input type="text" placeholder='Email' className="email" />
                            <button className="ok" style={{ cursor: "pointer" }}>OK</button>
                        </div>
                    </div>
                    <div className='f2'>
                        <span>Contact - <br /> <FaPhoneAlt /> &nbsp;&nbsp;  7014534800 <br />
                            <br />
                Email Address - <br />
                            <GrMail /> &nbsp;&nbsp; tilakshringar2@gmail.com <br />
                            <br />Address - <br /><GoLocation /> &nbsp;&nbsp;
                            <a href="https://www.google.com/maps/search/Agrasen+Chowk+Near+SBI+bank,+Sri+GangaNagar++335001/@29.9171895,73.8665255,13z/data=!3m1!4b1" target="#">  Agrasen Chowk Near SBI bank, Sri GangaNagar  335001</a></span>
                    </div>
                    <div className='f3'>
                        <p className="f3a"><Link to='/about' style={{ color: 'white' }}>About Us</Link></p>
                        <p className="f3b"><Link to='/privacypolicy' style={{ color: 'white' }}>Privacy Policy</Link></p>
                        <p className="f3c"><Link to='/shippingandreturninfo' style={{ color: 'white' }}>Shipping and Return</Link></p>
                        <p className="f3d"><Link to='/termsandcondition' style={{ color: "white" }}>Terms and Conditions</Link></p>
                    </div>
                </div>
                <div className="secondbox">
                    <div className="paymentmethod">
                        <p>PAYMENT METHODS</p>
                        <div className="logo">
                            <ul>
                                <li><img src={require('./phonepay.png').default} alt="RELOAD" /></li>
                                <li><img src={require('./paytmLogoOne.jfif').default} alt="RELOAD" /></li>
                                <li><img src={require('./googlepay.jfif').default} alt="RELOAD" /></li>
                            </ul>
                        </div>
                    </div>
                    <div className="followUs">
                        <p>FOLLOW US ON</p>
                        <div className="social">
                            <ul>
                                <a href="https://www.facebook.com/tilakshringar" target="#"><li style={{ background: '#3B5998', color: 'white' }}><FaFacebookF id ='fafacebook'/></li></a>
                                <a href="https://instagram.com/tilakshringar?igshid=rgba13aufzj4" target="#"><li className="instagram"><FaInstagram id ='fainsta' /></li></a>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='f4'><p>Tilak Shringar | <BiCopyright /> All rights reserved 2020 | Designed and Developed by <a href="https://www.agiledone.in/" target="_blank" className="Agiledone">AgileDone</a></p> <img src={require('../agileLogo.png').default}></img></div>
            </div>
        </footer>
    
    )
}

export default Footer
