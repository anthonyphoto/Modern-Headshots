import React from 'react';
import {connect} from 'react-redux';
import {fetchEventById} from '../../actions/schedule';
import ErrorSec from '../common/error-sec';
import LoadingSec from '../common/loading-sec';
import requiresLogin from '../user/requires-login';
import './myacct-page.css';

export class MygalleryPage extends React.Component {
    componentDidMount() {
        window.scrollTo(0,0);
        this.props.dispatch(fetchEventById(this.props.match.params.id));
    }
    

    render() {
        // console.log("photoLink", this.props.photoLink);
        console.log("currEvent", this.props.currEvent);

        if (this.props.error) {
            return  <ErrorSec err={this.props.error} />
        }

        if (this.props.loading) {
            return <LoadingSec />
        }
        // let loadingJsx = "";
        // if (this.props.loading) {
        //     loadingJsx = (
        //         <div className="loading">
        //             <img src="/img/loading-1.gif" />
        //         </div>
        //     )
        // }
            
        const eventTitle = this.props.currEvent? this.props.currEvent.eventTitle : "";
        const sessionDate = this.props.currEvent? new Date(this.props.currEvent.sessionDate).toLocaleString('en-US', {timeZoneName: "short"}): "";
        console.log("props", this.props); // const photoLink = this.props.photoLink?
        const photoJsx = this.props.photoLink.map((photo, ind) => {
            return (
                <div key={ind} className="mg-photo-div">
                    <img className="gallery-frame" src={photo} alt={`sample photo ${ind + 1}`} />
                </div>
            )
        });

        return (
            <div className='bg-peach bd'>

                <div className="hr-line"></div>
                <div className="row fi">
                {/* {loadingJsx} */}
                    <div className="mg-al-m">
                        <div className="mg-h2 i">
                            {eventTitle}
                        </div>
                        <div className="mg-txt mgt-1">
                            {sessionDate}
                        </div>
                        <div className="ma-h5 mgt-1">
                            Photographed by Anthony Kim
                        </div>
                        {photoJsx}
                    </div>
                </div>

            </div>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.schedule.loading,
        error: state.schedule.error,
        currUser: state.auth.currentUser,
        photoLink: state.schedule.currEvent? state.schedule.currEvent.photoLink: [],
        currEvent: state.schedule.currEvent
    };
};

export default requiresLogin()(connect(mapStateToProps)(MygalleryPage));
