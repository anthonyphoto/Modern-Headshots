import React from 'react';
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
        const status = (this.props.currEvent)? this.props.currEvent.status: "";
        if (this.props.error) {
            return  <ErrorSec err={this.props.error} />
        }

        let loadingJsx = "";
        if (this.props.loading) {
            loadingJsx = (
                <div className="loading">
                    <img src="/img/loading-1.gif" alt="loading" />
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
                                Let's plan to make you look amazing
                            </div>
                        :
                            <div className="book-h3 i book-al-r">
                                Your session is booked
                            </div>
                    }
                    <div className="book-session-info">
                        <SideSec />
                    </div>
                </div>
                <div className="book-div">
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
                                            Address: 61 Llanfair Road, Ardmore, PA 19003<br/>
                                        </li>
                                        <li>
                                            Phone: 267-347-0245<br/>
                                        </li>
                                    </ul>
                                    </div>
                            :
                                <div>
                                    {
                                        this.state.signType ==='signin'?
                                            <div>Plase sign in first 
                                                <LoginForm />
                                                <p className="book-txt">&nbsp;&nbsp;&nbsp; Don't have an account? &nbsp;
                                                <a href="#" onClick={e=>this.setSignType(e, "signup")}>Sign up here</a></p>
                                            </div>
                                        :
                                            <div>Member Registration
                                                <RegistrationForm />
                                                <p className="book-txt">&nbsp;&nbsp;&nbsp; Already have an account?
                                                 &nbsp;
                                                <a href="#" onClick={e=>this.setSignType(e, "signin")}>Sign in</a></p>
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
    
    const {currEvent, loading, error, redirect} = state.schedule;

    return {
        currUser: state.auth.currentUser,
        currEvent,
        loading,
        error,
        redirect,
    };
};

export default connect(mapStateToProps)(BookPage);