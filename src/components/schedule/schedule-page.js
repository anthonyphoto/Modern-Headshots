import React from 'react';
import {connect} from 'react-redux';
import CalendarSec from './calendar-sec';
import SideSec from './side-sec';
import ErrorSec from '../common/error-sec';
import {fetchEvents, resetEventState} from '../../actions/schedule';
import {hoverEvent, updateStartWeek} from '../../actions/schedule';

export class SchedulePage extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = null;
        this.props.dispatch(resetEventState());

    }

    componentDidUpdate() {
        if (this.props.redirect) this.props.history.push(this.props.redirect);
    }

    componentDidMount() {
        this.props.dispatch(fetchEvents());
        this.props.dispatch(hoverEvent(""));  // clear prev selection


        const weekDay = new Date().toLocaleString('en-US', {weekday:"short"});
        const startWeek = weekDay === "Sun"? 1: 0;
        this.props.dispatch(updateStartWeek(startWeek));  // reset the starting week

        if (!this.props.error) {
            document.getElementById('R4').scrollIntoView();
        }
    }

    render() {
        let status, id, phone, sessionDate, shootType, submitter, email, updated;         
        if (this.props.hoverEvent && this.props.hoverEvent.status !== 'Unavailable') {
            sessionDate = this.props.hoverEvent.sessionDate;
            submitter = this.props.hoverEvent.submitter;
            updated = this.props.hoverEvent.updated;
            phone = this.props.hoverEvent.phone;
            email = this.props.hoverEvent.email;
            shootType = this.props.hoverEvent.shootType;
            status = this.props.hoverEvent.status;
            id = this.props.hoverEvent.id;
        }

        if (this.props.error) {
            return  <ErrorSec err={this.props.error} />
        }

        let loadingJsx = "";
        if (this.props.loading) {
            loadingJsx = (
                <div className="loading">
                    <img src="/img/loading-1.gif" alt="loading" />
                </div>
            )
        }

        return (
            <React.Fragment>
                <div className="hr-line"></div>
                <div className="row fi">
                    {loadingJsx}
                    <div className="mgt-6"></div>
                    <CalendarSec />
                    
                    <div className="side-box fi">
                        <div className='fine-txt'>{sessionDate}</div>
                        {
                            this.props.currEvent? 
                                this.props.currEvent.status==='Available'?
                                    <div>
                                        <div className='cal-status-av i mgt-1'>
                                            Available
                                        </div>
                                        <div>                              
                                            <SideSec />
                                        </div>
                                    </div>
                                :
                                    <div>
                                        <div className='cal-status-bk i mgt-1'>
                                        Already Booked
                                
                                        </div>
                                        <div>                              
                                            <SideSec />
                                        </div>
                                    </div>
                            :
                                    <div className="mgt-4">
                                        <div className='side-box-msg cal-h3 i bg-na-sel'>
                                        Please click an available slot on the calendar
                                        </div>
                                        <div>                              
                                            {/* <SideSec /> */}
                                        </div>
                                    </div>
                        }
                    </div>
                    <div className="clear-float"></div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    const {events, currEvent, timeZone, loading, error, redirect} = state.schedule;
    return {
        events,
        currEvent,
        timeZone,
        loading,
        error,
        redirect
    };
};

export default connect(mapStateToProps)(SchedulePage);