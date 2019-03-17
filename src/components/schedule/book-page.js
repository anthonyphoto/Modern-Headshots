import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {resetRedirect} from '../../actions/schedule';
import ErrorSec from '../common/error-sec';
import LoginForm from '../user/login-form';
import RegistrationForm from '../user/registration-form';
import BookForm from './book-form';
import SideSec from './side-sec';

import './book-page.css';

export class BookPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signType: "signin"
        }

    }

    componentDidMount() {
        
        window.scrollTo(0,0);
        /* If page was redirected, reset redirect link */
        if (this.props.redirect === '/book') this.props.dispatch(resetRedirect());
        if (!this.props.currEvent) this.props.history.push('/calendar');

    }

    /* defing sign-in or sign-up */
    setSignType(e, signType) {
        e.preventDefault();
        this.setState({
            signType: signType
        });
    }

    render() {

        console.log("this.state",this.state);
        const status = (this.props.currEvent)? this.props.currEvent.status: "";
        if (this.props.error) {
            return  <ErrorSec err={this.props.error} />
        }

        let loadingJsx = "";
        if (this.props.loading) {
            loadingJsx = (
                <div className="loading">
                    <img src="/img/loading-1.gif" />
                    Loading
                </div>
            )
        }

    
        return (
        <React.Fragment>
            <div className="hr-line"></div>
            <div className="row fi">
                {loadingJsx}
                <div className="book-div">
                    {
                        status === "Available"?
                            <div className="book-h3 i book-al-r">
                                Let's book to make you look amazing
                            </div>
                        :
                            <div className="book-h3 i book-al-r">
                                Your session is booked
                            </div>
                    }
                    <div className="book-session-info">
                        <SideSec />
                    </div>
                    {/* Requested Session Time: 
                        { this.props.currEvent? this.props.currEvent.sessionDate: null } */}
                        
                </div>
                <div className="book-div">
                    <div className="book-h3">
                    </div>
                    <div className="book-font mgt-1">
                        {
                            this.props.currUser?
                                status === 'Available'?
                                    <div>
                                        <div>
                                            Please complete the following form.
                                        </div>
                                        <BookForm />
                                    </div>
                                :
                                    <div className="mgt-6">
                                    <ul>
                                        <li>
                                            Plan to arrive 10 min early before the scheduled time
                                        </li>
                                        <li>
                                            If you want to update your contact info, please go to <Link className="book-spc-l" to="/myacct">My Account</Link> page 
                                        </li>
                                        <li>
                                            Address: 61 Llanfair Road, Ardmore, PA 19003<br/>
                                        </li>
                                        <li>
                                            Phone: 267-347-0245<br/>
                                        </li>
                                    </ul>




                                    </div>
                            :
                                <div>
                                    You need to Login first before booking a session.
                                    {
                                        this.state.signType ==='signin'?
                                            <div>
                                                <LoginForm />
                                                <a href="#" onClick={e=>this.setSignType(e, "signup")}>New User</a>
                                            </div>
                                        :
                                            <div>
                                                <RegistrationForm />
                                                <a href="#" onClick={e=>this.setSignType(e, "signin")}>Log in</a>
                                            </div>
                                    }
                                </div>
                        }
                    </div>
                </div>
                <div className="book-clear-float">
                </div>
            </div>
        </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    
    const {events, currEvent, timeZone, loading, error, redirect} = state.schedule;
    // console.log("curr", currEvent);

    return {
        currUser: state.auth.currentUser,
        events,
        currEvent,
        timeZone,
        loading,
        error,
        redirect,
    };
};

export default connect(mapStateToProps)(BookPage);
// export default requiresLogin()(connect(mapStateToProps)(SchedulePage));
// currEvent: state.schedule.events[0],
// date: state.schedule.events[0].sessionDate,
