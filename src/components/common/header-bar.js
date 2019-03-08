import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {clearAuth} from '../../actions/auth';
import {clearAuthToken} from '../../local-storage';
import './header-bar.css';

export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
        // Only render the log out button if we are logged in
        let logOutButton, myAcctLink;
        if (this.props.loggedIn) {
            logOutButton = (
                <button onClick={() => this.logOut()}>Log out</button>
            );
            myAcctLink = (
                <a onClick={()=>this.logOut()} className="hd-spc" href="#">SIGN OUT</a>
            );
        }
        else {
            myAcctLink = (
                <Link className="hd-spc" to="/signin">SIGN IN </Link>
            );
        }
        return (
            <header className="hd-wrapper bg-white" role="banner">
                <div className="hd fi">
                    <Link to="/">
                        <img src='/img/adlogo.png' alt='anthony photo logo' />
                    </Link>
                    <nav className="hd-div" role="navigation">
                        <Link className="hd-spc" to="/intro">INTRO</Link>
                        <Link className="hd-spc" to="/schedule">SCHEDULE</Link>
                        {myAcctLink}
                    </nav>
                </div>
                {/* <div className="hr-linew"></div> */}
            </header>
        );
    }
}
                        // {/* {logOutButton} */}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
