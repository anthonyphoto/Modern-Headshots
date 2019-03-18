import React from 'react';
import {connect} from 'react-redux';
import CalendarCell from './calendar-cell';
import {updateStartWeek, updateTimeZone} from '../../actions/schedule';
import {getWeeklyDates} from './calendar-utils';
import './calendar.css';

const gotoPrevWeek = (e, props) => {
    e.preventDefault();
    props.dispatch(updateStartWeek(props.startWeek - 1));
}

const handleWeekUpdate = (e, props, num) => {
    e.preventDefault();
    props.dispatch(updateStartWeek(num));
}

const handleTimeZoneChange = (tz, props) => {
    props.dispatch(updateTimeZone(tz));
    // console.log('TZ', tz);
}

const getDayHeaderJsx = (props, currDay, arrDates, ind) => 
    (currDay === arrDates[ind] && props.startWeek === 0)? 
         (<span className='today'>{arrDates[ind]}</span>):
         <span>{arrDates[ind]}</span>;


export function CalendarSec (props) {

    const { startYear, startMon, startDay, shortTZ, currDay, arrDates } = getWeeklyDates(props.startWeek, props.timeZone);
    const arrGrid = [];
    const timeLabel = ['MIDNIGHT', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', 'NOON', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'];

    for (let hr = 0; hr < 24; hr++){
        const key = `R${hr}`;
        arrGrid.push(<div key={key} id={key} className="cell-font cal-cell-hr al-r">{timeLabel[hr]}</div>);

        for (let day = 0; day < 7; day++){
            const {key, id, status} = props.grid[day][hr];
            arrGrid.push(<CalendarCell key={key} day={day} hr={hr} id={id} status={status} />);

        }
    }

    const monIndex = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monLabel = monIndex.find((a, ind)=> ind === parseInt(startMon, 10) - 1);

    const timeZone = [
            ['America/Los_Angeles', 'Pacific Time (Los Angeles)'], 
            ['America/Denver', 'Mountain Time (Denver)'], 
            ['America/Chicago', 'Central Time (Chicago)'], 
            ['America/New_York', 'Eastern Time (Philadelphia)']
            ];
    const tzJsx = timeZone.map((tz, ind) => (<option key={`${tz}${ind}`} value={tz[0]} >{tz[1]}</option>));

    return (
        <div className="cal-box mgt-1">
            <div className='cal-header cell-font'>
                <div className="cal-mobile-only">
                * Please click an available slot on the calendar
                </div>
                <div className="mgt-2 cal-flex">
                    <div className='cal-h2'>{monLabel} {startYear}</div>
                    <div className='cal-header-menu'>Time zone &nbsp;
                        <select defaultValue='America/New_York' onChange={e=>handleTimeZoneChange(e.target.value, props)} id="timeZone">
                            {tzJsx}
                        </select> &nbsp; &nbsp;
                        <a href="prev" onClick={e => handleWeekUpdate(e, props, props.startWeek - 1)}>&lt;</a> 
                        <a href="today" onClick={e => handleWeekUpdate(e, props, 0)}>Today</a>
                        <a href="next" onClick={e => handleWeekUpdate(e, props, props.startWeek + 1)}>&gt;</a> 
                    </div>
                </div>
                <div className='cal-cell-hd'> </div>
                <div className='cal-cell-hd'>
                    Mon {getDayHeaderJsx(props, currDay, arrDates, 0)}
                </div>
                <div className='cal-cell-hd'>
                    Tue {getDayHeaderJsx(props, currDay, arrDates, 1)}
                </div>
                <div className='cal-cell-hd'>
                    Wed {getDayHeaderJsx(props, currDay, arrDates, 2)}
                </div>
                <div className='cal-cell-hd'>
                    Thu {getDayHeaderJsx(props, currDay, arrDates, 3)}
                </div>
                <div className='cal-cell-hd'>
                    Fri {getDayHeaderJsx(props, currDay, arrDates, 4)}
                </div>
                <div className='cal-cell-hd'>
                    Sat {getDayHeaderJsx(props, currDay, arrDates, 5)}
                </div>
                <div className='cal-cell-hd'>
                    Sun {getDayHeaderJsx(props, currDay, arrDates, 6)}
                </div>
            </div>
            <div className="cal-top-space">
                {arrGrid}
            </div>
            <div className="clear-float"></div>
        </div>
    );
}

const mapStateToProps = state => {
    const {events, grid, startWeek, currEvent} = state.schedule;
    return {
        events,
        grid,
        startWeek,
        currEvent,
        error: state.schedule.error,
        timeZone: state.schedule.timeZone,
        loading: state.schedule.loading
    };
};

export default connect(mapStateToProps)(CalendarSec);
