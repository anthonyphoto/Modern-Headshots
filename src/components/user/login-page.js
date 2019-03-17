import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import LoginForm from './login-form';
import "./user.css";

export function LoginPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/myacct" />;
    }

    return (
        <div>
            <div className="hr-line"></div>
            <div className="row fi">
                <div className="user-div">
                    <div className="user-h2">Sign In</div>
                    <p className="user-notice">&nbsp;&nbsp;Demo Account: melody@demo.com / demo</p>
                    <LoginForm />
                    <br/>&nbsp;&nbsp; Don't have an account? &nbsp; <Link to="/signup">Sign up here</Link>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LoginPage);
