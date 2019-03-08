import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';

import HeaderBar from './common/header-bar';
import FooterBar from './common/footer-bar';
import LandingPage from './info/landing-page';
import IntroPage from './info/intro-page';
import LoginPage from './user/login-page';
import SchedulePage from './schedule/schedule-page';
import RegistrationPage from './user/registration-page';
import {refreshAuthToken} from '../actions/auth';

export class App extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            60 * 60 * 1000 // One hour
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }

    render() {
        return (
            <div className='bg-white bd'>
                <HeaderBar />
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/schedule" component={SchedulePage} />
                <Route exact path="/intro" component={IntroPage} />
                <Route exact path="/signin" component={LoginPage} />
                <Route exact path="/signup" component={RegistrationPage} />
                <FooterBar />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
