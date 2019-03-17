import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import RegistrationForm from './registration-form';
import "./user.css";


export function RegistrationPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/myacct" />;
    }
    return (
        <div>
            <div className="hr-line"></div>
            <div className="row">
                <div className="user-div">
                    <div className="user-h2">Sign Up</div>
                    <RegistrationForm />
                    <br/>&nbsp;&nbsp; Already have an account? &nbsp; <Link to="/signin">Sign In</Link>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);