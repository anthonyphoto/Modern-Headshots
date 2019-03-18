import React from 'react';
import {Link} from 'react-router-dom';
import './intro-page.css';

export default class IntroPage extends React.Component {

    componentDidMount(){
        window.scrollTo(0,0);
    }

    render(){
        return (
            <div className="fi bg-img">
                <div className="row info-div bd">

                    <div className="mgt-6">
                        <div className="h1 i">
                        I'm Anthony
                        </div>
                        <div className="box-div mgt-4">
                            <p className='txt'>Hi there! <br/>
                            Thank you for visiting my site.</p>
                            <p className='txt'>
                                Although my main profession is a software engineer as shown on my <a href="https://www.linkedin.com/in/myanthony/" target="_blank">LinkedIn</a>, I am also a photo enthusiast.  
                            </p>
                            {/* <p className='txt'>
                                I have been voluntarily shooting portraits for babies, children, couples, and elderly for years. Many of my friends and colleagues love their photos I took and they use on social media effectively.
                            </p> */}
                            <p className='txt'>
                                I would like to offer you a headshot session in the Philadelphia area for free (or at a minimal charge for additional services). 
                            </p>
                            <p className='txt'>
                                If you're interested, please follow 3 simple steps.<br/><br/><br/>
                            </p>

                            <div className='int-h2 i'>1. Schedule</div>
                            <ul>
                                <li className='txt'>Please book your session here <Link className="info-spc-l no-undln" to="/calendar"> > </Link></li>
                                <li className='txt'>I apologize for my limited availability</li>
                            </ul>
                            <div className='int-h2 i'>2. Shoot</div>
                            <ul>
                                <li className='txt'>Please visit my location with a desired outfit</li>
                                <li className='txt'>A headshot session takes from 30 min up to an hour</li>
                            </ul>
                            <div className="mgt-2"><img src="/img/shoot-example.gif" className="info-img" alt="shoot example" /></div>
                            <div className='int-h2 i'>3. Deliver</div>
                            <ul>
                                <li className='txt'>Your pictures will be ready within 72 hours</li>
                                <li className='txt'>You can view and download your pictures from "My Account" page</li>
                            </ul>
                            <div className=".info-full-with">
                                <img src="/img/result-1.png" className="info-img" alt="shoot result" />
                            </div>

                        </div>
                    </div>
                </div>
            </div> 

        );
    }
}
