import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './landing-page.css';

export class LandingPage extends React.Component{
    // If we are logged in redirect straight to the user's dashboard
    // if (props.loggedIn) {
    //     return <Redirect to="/dashboard" />;
    // }

    componentDidMount() {
        window.scrollTo(0,0);
    }

    render(){
        return (
            <div className="row fi">
                <div className="img-main">
                    <img src="/img/title-1.jpg" className="img-main" alt="main photo" />
                    <div className="pos-title">
                    <span className='title'>Modern<br/>&nbsp;&nbsp; Headshots<br/></span>
                    </div>
                    <div className='sub-title'>
                    <span className="arrow"> > </span> 
                    <Link to='/schedule'>Schedule Now</Link></div>
                </div>
                <div>
                    {/* <div className="h2 i mgt-6 al-r">
                    </div> */}
                    {/* <div className="h2">
                    Did you know? */}
                    
                    <div className="mgt-6 flt">
                        <div className="div-l mgt-2">
                            <img className="img-main" src="/img/sample1.png" alt="headshot sample" />
                        </div>

                        <div className="div-r mgt-2">
                            <div className="h2 i al-r">
                            A great headshot is crucial for your success
                            </div>
                            <ul className="mgt-2">
                                <li className='normal list'>
                                You are 14X more likely to be taken seriously if you have a professional headshot on your social media profiles. 
                                <a target="_blank" className="spc-l" href="https://blog.linkedin.com/2014/07/14/a-professional-photographers-guide-to-getting-the-right-linkedin-profile-photo">LinkedIn ></a>
                                </li>
                                <li className='normal list'>
                                9 out of 10 of people will research you on social media before deciding to hire or work with you. <a target="_blank" className="spc-l" href="https://www.themuse.com/advice/job-seekers-social-media-is-even-more-important-than-you-thought">The Muse ></a>
                                </li>
                                <li className='normal list'>
                                1 in 5 people will ONLY look at your profile picture and nothing else on your LinkedIn page. <a target="_blank" className="spc-l" href="https://www.refinery29.com/en-us/2012/08/35128/beauty-survey">HSN Beauty ></a>
                                </li>

                            </ul>
                        </div>
                    </div>
                    {/* <div className="flt-clr">
                    </div> */}
                </div>
            </div> 
        );
    }
}


const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
