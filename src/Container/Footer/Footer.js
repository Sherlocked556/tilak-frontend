import React from 'react'
import './Footer.css';
import { FaPhoneAlt } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { GoLocation } from "react-icons/go";
import { BiCopyright } from 'react-icons/bi';
import { Link } from 'react-router-dom';
function Footer() {
    return (
        <div className='footer'>
            <div className='f1'><b>Want latest updates? Just subscribe</b>
                <div className="emaildiv">
                    <input type='text' placeholder='Email' className='email'></input><button className='ok' style={{ cursor: "pointer" }}>OK</button>
                </div>
            </div>

            <div className='f2'>
                <span>Contact - <br /> <FaPhoneAlt /> &nbsp;&nbsp;  7014534800 <br />
                    <br />
                Email Address - <br />
                    <GrMail /> &nbsp;&nbsp; tilakshringar2@gmail.com <br />
                    <br />
                    <a href="https://www.google.com/maps/search/Agrasen+Chowk+Near+SBI+bank,+Sri+GangaNagar++335001/@29.9171895,73.8665255,13z/data=!3m1!4b1"> Address - <br /> <GoLocation /> &nbsp;&nbsp;Agrasen Chowk Near SBI bank, Sri GangaNagar  335001</a></span>
            </div>
            <div className='f3'>
                <p className="f3a"><Link to='/about' style={{ color: 'white' }}>About Us</Link></p>
                <p className="f3b"><Link to='/privacypolicy' style={{ color: 'white' }}>Privacy Policy</Link></p>
                <p className="f3c"><Link to='/shippingandreturninfo' style={{ color: 'white' }}>Shipping and Return</Link></p>
                <p className="f3d"><Link to='/termsandcondition' style={{ color: "white" }}>Terms and Conditions</Link></p>
                {/* <p className="f3e">Return your Order</p> */}
            </div>

            <div className='f4'><p>Tilak Shringar | <BiCopyright /> All rights reserved 2020 | Designed and Developed by <a to="https://www.agiledone.in/" target="_blank">AgileDone</a></p> <img src={require('../agileLogo.png')}></img></div>

        </div>
    )
}

export default Footer
