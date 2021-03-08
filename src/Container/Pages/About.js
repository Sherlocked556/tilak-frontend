import React from 'react';
import Header from '../Top Nav Bar/Header';
import Footer from '../Footer/Footer';
import Index3 from '../Side Nav Bar/Index3';
import './About.css';
import { MdLocationOn } from "react-icons/md";
import { Link } from 'react-router-dom';


function About() {
    return (
        <div>
            <Header />
            <Index3 />
            <div className='bheadandadd'>
                {/* <div className='bhead'><img src={require("../Top Nav Bar/02-01.png").default}></img></div> */}
                <MdLocationOn id='loc' viewBox='4 4 15.5 20' />
                <a href="https://www.google.com/maps/search/Agrasen+Chowk+Near+SBI+bank,+Sri+GangaNagar++335001/@29.9171895,73.8665255,13z/data=!3m1!4b1" target='#' style={{cursor:'pointer'}}><p>Agrasen Chowk Near SBI bank, Sri GangaNagar  335001</p></a>
            </div>
            <h2 className='aboutheadline'>about us...</h2>
            <div className="imageAboutUs">
                <img src={require("../TilakAbout.jpg").default} alt=""></img>
            </div>
            <p className="aboutUsPara">We are a group of Lord Krishna devotees who aim to bring you the latest designer Krishna clothes and accessories. We commenced our journey in 2013, seven years back, and employed housewives in Sri Ganganagar, Rajasthan to make them feel empowered. This financial independence for housewives is our giving back to society. Each piece of cloth, accessory, ornament, and idols is crafted with at most dedication and devotion. By sitting in your comfort zone, at your home you get mesmerizing artifacts to dress up your Laddu Gopal and Radha Rani with elegance. You can view different products at one place on our user-friendly interface to with high- resolution images to make your hassle-free shopping experience worthwhile.</p>
            <p className="memoryOf">in the memory of...</p>
            <div className="memoryImage">
                <img src={require('../memoryImage.jpg').default} alt=""></img>
            </div>
            <div className="yearMemory">
                <p className="nameBold">Late SMT. Sunita Devi</p>
                <p className="yearofMemory"> (1957-2012)</p>
            </div>


            <p className="work">our work...</p>
            <div className="grid">
                <div className="gridImageBox1">
                    <div className="outerBoxGcard1">
                        <div className="slider1">
                            <img src={require('../slider1 (1).png').default}></img>
                            <img src={require('../slider1 (2).png').default}></img>
                            <img src={require('../slider1 (3).png').default}></img>
                        </div>
                    </div>
                    <div className="outerBoxgcard2">
                        <div className="slider2">
                            <img src={require('../slider1 (4).png').default}></img>
                            <img src={require('../slider1 (5).png').default}></img>
                            <img src={require('../slider1 (6).png').default}></img>
                        </div>
                    </div>
                </div>
                <div className="outerBoxgcard3">
                    <div className="slider3">
                        <img src={require('../slider2 (1).png').default}></img>
                        <img src={require('../slider2 (2).png').default}></img>
                        <img src={require('../slider2 (3).png').default}></img>
                    </div>
                </div>
                <div className="gridImageBox3">
                    <div className="outerBoxgcard4">
                        <div className="slider4">
                            <img src={require('../slider3 (1).png').default}></img>
                            <img src={require('../slider3 (2).png').default}></img>
                            <img src={require('../slider3 (3).png').default}></img>
                        </div>
                    </div>
                    <div className="box3Inside">
                        <div className="outerBoxgcard5">
                            <div className="slider5">
                                <img src={require('../slider1 (7).png').default}></img>
                                <img src={require('../slider1 (8).png').default}></img>
                                <img src={require('../slider1 (9).png').default}></img>
                            </div>
                        </div>
                        <div className="outerBoxgcard6">
                            <div className="slider6">
                                <img src={require('../slider1 (10).png').default}></img>
                                <img src={require('../slider1 (11).png').default}></img>
                                <img src={require('../slider1 (12).png').default}></img>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="outerBoxgcard7">
                    <div className="slider7">
                        <img src={require('../slider2 (4).png').default}></img>
                        <img src={require('../slider2 (5).png').default}></img>
                        <img src={require('../slider2 (6).png').default}></img>
                    </div>
                </div>
            </div>
            <div className='cards'>
                <div className='rcard1'>
                    <span><Link to='/shop' style={{ color: '#4D4D4D' }}>SHOP</Link></span>
                </div>
                <div className='rcard2'>
                    <span><Link to='/about' style={{ color: '#4D4D4D' }}>ABOUT</Link></span>
                </div>
                <div className='rcard3'>
                    <span><Link to='/categories' style={{ color: '#4D4D4D' }}>CATEGORIES</Link></span>
                </div>
                <div className='rcard4'>
                    <span><Link to='/query' style={{ color: '#4D4D4D' }}>QUERY</Link></span>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default About;
