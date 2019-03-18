import React from 'react';
import {connect} from 'react-redux';
import {clickEvent, hoverEvent} from '../../actions/schedule';
import './calendar.css';


const handleClick = (e, props) => {
    e.preventDefault();
    props.dispatch(clickEvent([props.day, props.hr]));
}

const handleMouseOver = props => {
    props.dispatch(hoverEvent([props.day, props.hr]));
}

const handleMouseOut = props => {
    props.dispatch(hoverEvent(""));
}


export function CalendarCell (props) {
    let bgClass = 'cal-cell cell-font';
    switch (props.status) {
        case "Available":
            bgClass += ' bg-available';
            break;

        case "Booked":
            bgClass += ' bg-booked';
            break;

        default: 
            bgClass += ' bg-na';
    }

    return (
        <React.Fragment>
            { props.id?
                    props.status === 'Available'?
                    // onMouseOut={() => handleMouseOut(props)} 
                        <a onMouseOut={() => handleMouseOut(props)} onMouseOver={() => handleMouseOver(props)} className={bgClass} onClick={e=>handleClick(e, props)} href="mouseout">
                        {props.status}
                        </a>
                    :
                        <a onMouseOut={() => handleMouseOut(props)} onMouseOver={() => handleMouseOver(props)} className={bgClass} onClick={e=>e.preventDefault()} href="mouseover">
                        {props.status}
                        </a>
            :
                <div className={bgClass}> 
                    {props.status}
                </div>
            }
        </React.Fragment>

    );
}

export default connect()(CalendarCell);

