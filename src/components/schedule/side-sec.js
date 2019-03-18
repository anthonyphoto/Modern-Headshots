import React from 'react';
import {connect} from 'react-redux';
import './calendar.css';
export class SideSec extends React.Component {

    render() {

        let status, id, phone, eventPhone, sessionDate, shootType, submitter, email, updated;         
        if (this.props.currEvent && this.props.currEvent.status !== 'Unavailable') {
            sessionDate = this.props.currEvent.sessionDate;
            submitter = this.props.currEvent.submitter;
            updated = this.props.currEvent.updated;
            phone = this.props.currEvent.phone;
            eventPhone = this.props.currEvent.eventPhone;
            email = this.props.currEvent.email;
            shootType = this.props.currEvent.shootType;
            status = this.props.currEvent.status;
            id = this.props.currEvent.id;
        }
        return (
            <div className=' fi'>
                {
                    this.props.currEvent? 
                        this.props.currEvent.status==='Available'?
                            <div className='side-box-msg cal-txt bg-available-sel'>
                                <ul>
                                    <li>Date: {sessionDate.split(/,/)[0]}</li>
                                    <li>Time: {sessionDate.split(/,/)[1]}</li>
                                    <li>Duration: 1 hour</li>
                                    <li>Shooting Type: Headshot</li>
                                    <li>Photographer: {submitter}</li>
                                    <li>Email: <a className='side-spc-l' href={`mailto:${email}`}>{email}</a></li>
                                    <li>Phone: {phone}</li>
                                </ul>
                            </div>
                        :
                            this.props.currEvent.status==="Booked"?
                                <div>
                                    <div className='side-box-msg cal-txt bg-booked-sel'>
                                    <ul>
                                        <li>Date: {sessionDate.split(/,/)[0]}</li>
                                        <li>Time: {sessionDate.split(/,/)[1]}</li>
                                        {/* <li>Duration: 1 hour</li> */}
                                        <li>Reserved by {submitter}</li>
                                        {/* <li>Shooting Type: {shootType}</li> */}
                                        <li>Email: <a className='side-spc-l' href={`mailto:${email}`}>{email}</a></li>
                                        <li>Phone: {eventPhone}</li>
                                        {/* <li>Status: {status}</li> */}
                                        <li>REF#: {id.toUpperCase().slice(-8)}</li>
                                        <li>Reserved on {updated.split(/,/)[0]}</li>
                                    </ul>
                                    </div>
                                    <div className='fine-txt mgt-1'>
                                    * This info is shown to all users for demo purpose.
                                    </div>
                                </div>
                            :
                                <div>
                                    <div className='side-box-msg cal-txt bg-result'>
                                    <ul>
                                        <li>REF#: {id.toUpperCase().slice(-8)}</li>
                                        <li>Event: {this.props.currEvent.eventTitle}</li>
                                        <li>Date: {sessionDate.split(/,/)[0]}</li>
                                        <li>Time: {sessionDate.split(/,/)[1]}</li>
                                        {/* <li>Duration: 1 hour</li> */}
                                        <li>Phone: {eventPhone}</li>
                                        <li>Reserved by {this.props.currUser.firstName} {this.props.currUser.lastName}</li>
                                        {/* <li>Shooting Type: {shootType}</li> */}
                                        {/* <li>Email: <a className='side-spc-l' href={`mailto:${this.props.currUser.username}`}>{this.props.currUser.username}</a></li>
                                        <li>Phone: {this.props.currUser.phone}</li> */}
                                        {/* <li>Status: {status}</li> */}
                                        <li>Reserved on {updated.split(/,/)[0]}</li>
                                    </ul>
                                    </div>
                                </div>

                    :
                        <div className="cell-font">Please select an available slot on the calendar</div>

                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currUser: state.auth.currentUser,
        currEvent: state.schedule.currEvent,
        timeZone: state.schedule.timeZone
    };

};

export default connect(mapStateToProps)(SideSec);
