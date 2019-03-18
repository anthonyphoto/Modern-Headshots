import React from 'react';
import {connect} from 'react-redux';
import {fetchMyEvents, resetEventState} from '../../actions/schedule';
import ErrorSec from '../common/error-sec';
import LoadingSec from '../common/loading-sec';
import MyeventCard from "./myevent-card";
import requiresLogin from '../user/requires-login';
import {Link} from 'react-router-dom';
import './myacct-page.css';

export class MyacctPage extends React.Component {
    componentDidMount() {
        window.scrollTo(0,0);
        this.props.dispatch(fetchMyEvents(this.props.currUser.id));
        this.props.dispatch(resetEventState());
    }

    componentWillUnmount() {
        this.props.dispatch(resetEventState());
    }

    getEventsJsx(events, eventType) {
        const eventsJsx = events.map(event => {
            const {_id:id, eventTitle, sessionDate, shootType, updated, photoLink} = event;
            const sessionDateEST = new Date(sessionDate).toLocaleString('en-US', {timeZoneName: "short"});
            const updatedEST = new Date(updated)
                                .toLocaleString('en-US', {timeZoneName: "short"})
                                .split(/,/)[0];  // get only date portion
            return (
                <MyeventCard 
                    key={id} 
                    eventType={eventType} 
                    eventTitle={eventTitle} 
                    photoYN={photoLink.length? "true": ""} 
                    id={id} 
                    sessionDate={sessionDateEST}
                    updated={updatedEST}
                />
                )
            });
        
        return eventsJsx;
    
    }

    render() {
        const pastEvents = this.getEventsJsx(this.props.pastEvents, "past");
        const futureEvents = this.getEventsJsx(this.props.futureEvents, "future");
        
        if (this.props.error) {
            return  <ErrorSec err={this.props.error} />
        }

        if (this.props.loading) {
            return <LoadingSec />
        }

        return (
            <div className='bg-peach'>
                <div className="hr-line"></div>
                <div className="row mgt-6 fi">
                    <div className="ma-al-m">
                        <div>&nbsp;</div>
                        <div className="ma-h3 mgt-2 ma-spc-l">
                            Welcome <span className="mu">{this.props.currUser.firstName}</span>
                            <svg width="35" height="35" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g fill="#ec4e3e" fillRule="evenodd"><path d="M38.21 30.534c-.357-3.294-.78-6.582-1.056-9.882-.417-4.982-.752-9.973-1.07-14.962-.046-.754.16-1.531.309-2.284.178-.892.73-1.82 1.59-1.698.863.122 1.78.774 2.387 1.448.39.434.436 1.355.341 2.015-.598 4.173.086 8.31.366 12.443.265 3.937.981 7.845 1.522 11.762.106.762.306 1.51.48 2.262.32 1.394-.097 2.72-1.018 3.192-1.083.554-3.1.064-3.812-.996-.21-.312-.247-.771-.27-1.168-.042-.703-.012-1.41-.012-2.115l.243-.017zM44.65 47.088c-1.942.036-3.617-1.368-3.61-3.025.01-1.672 1.716-3.699 3.057-3.81 1.41-.12 3.252 2.56 3.273 4.147.019 1.375-1.312 2.662-2.72 2.688M18.256 9.355c0-1.129-.074-2.265.027-3.385.067-.739.237-1.55.625-2.161.703-1.107 1.444-1.123 2.423-.247 1.04.933 1.441 1.955 1.436 3.496-.016 4.077.243 8.168.645 12.228.347 3.492 1.028 6.952 1.591 10.42.124.757.415 1.487.553 2.243.26 1.401-.252 2.256-1.477 2.592-1.439.394-2.723-.094-3.204-1.28a6.327 6.327 0 0 1-.399-1.636c-.354-3.143-.674-6.29-1.014-9.434-.463-4.27-.934-8.54-1.4-12.81l.194-.026zM21.916 44.58c.584-.93.935-1.804 1.552-2.403 1.314-1.273 1.956-1.15 3.05.34.29.397.544.824.797 1.247.768 1.284.336 3.053-1.076 3.488-.859.265-2.083.238-2.807-.206-.71-.434-.997-1.562-1.516-2.465M5.262 31.654c-1.678.003-2.374-.65-2.362-2.461.034-5.012.042-10.027.229-15.035.15-4.022.552-8.034.825-12.053.046-.67.116-1.29.878-1.512.734-.213 1.377-.105 1.906.53.55.66 1.047 1.287.967 2.249-.31 3.72-.773 7.44-.792 11.164-.024 4.8.288 9.605.53 14.405.105 2.101-.302 2.71-2.18 2.713M5.885 43.367c.004 1.164-.687 1.962-1.882 2.171-1.412.247-2.617-.448-2.978-1.717-.278-.975.29-2.882 1.12-3.459.306-.212.796-.32 1.162-.256 1.288.228 2.572 1.912 2.578 3.261"></path></g></svg>
                        </div>
                        <p className='ma-txt2 ma-spc-l'>You can check your photos and schedules here<br/>
                        </p>
                    </div>
                    <div className="ma-flx">
                        <div className="ma-box">
                            <div className="ma-h4 i ma-al-m">Upcoming Events</div>
                            {
                                this.props.futureEvents.length === 0? 
                                    <div className="event-box">
                                        <div className="ev-title">
                                            You have no reservation.
                                        </div>
                                        <div className="ev-detail">
                                            Please click the button below to book a new session.
                                        </div>
                                        <div className="ev-bottom">
                                            <div> </div>
                                            <Link className="ma-btn-lk" to='/book' >Schedule</Link>
                                        </div>
                                    </div>
                                :
                                    futureEvents
                            }
                        </div>
                        <div className="ma-box">
                            <div className="ma-h4 i ma-al-m">Past Events</div>
                            {pastEvents}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currUser: state.auth.currentUser,
        pastEvents: state.schedule.pastEvents,
        futureEvents: state.schedule.futureEvents,
        loading: state.schedule.loading,
        error: state.schedule.error
    };
};

export default requiresLogin()(connect(mapStateToProps)(MyacctPage));
