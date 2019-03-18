import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {clearAuth} from '../../actions/auth';
import {clearAuthToken} from '../../local-storage';
import './header-bar.css';

function logOut(e, props){
    e.preventDefault();
    props.dispatch(clearAuth());
    clearAuthToken();
}

export function HeaderBar(props) {
    const bgClass = props.currPath.slice(0, 7) === "/myacct"? 
                "hd-wrapper bg-peach" : "hd-wrapper bg-white";

    let myAcctLink;

    if (props.loggedIn) {
        myAcctLink = (
            <React.Fragment>
                <Link to="/myacct">MY ACCOUNT</Link> &nbsp;
                <a onClick={e=>logOut(e, props)} className="hd-spc" href=""><img className="signout" src="/img/signout.png" alt="sign out" /></a>
            </React.Fragment>
        );
    }
    else {
        myAcctLink = (
            <Link className="hd-spc" to="/signin">SIGN IN </Link>
        );
    }

    return (
        <header className={bgClass} role="banner">
            <div className="hd fi">
                <Link to="/">
                    <img className="logo" src='/img/adlogo.png' alt='anthony photography logo' />
                </Link>
                <nav className="hd-div">
                    <Link className="hd-spc" to="/intro">INTRO</Link>
                    <Link className="hd-spc" to="/calendar">SCHEDULE</Link>
                    {myAcctLink}
                </nav>
            </div>
        </header>
    );
}


const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
