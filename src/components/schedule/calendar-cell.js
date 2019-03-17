import React from 'react';
import {connect} from 'react-redux';
import {clickEvent, hoverEvent} from '../../actions/schedule';
import './calendar.css';


const handleClick = (e, props) => {
    // console.log(props);
    e.preventDefault();
    props.dispatch(clickEvent([props.day, props.hr]));
    // props.history.push('/book');   // won't work
}

const handleMouseOver = props => {
    props.dispatch(hoverEvent([props.day, props.hr]));
    // console.log('hover', props.status);
}

const handleMouseOut = props => {
    props.dispatch(hoverEvent(""));
    // console.log('hover', props.status);
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

    // <div onClick={console.log('clicked')} className="test al-r cal-cell"></div>
    return (
        <React.Fragment>
            { props.id?
                    props.status === 'Available'?
                    // onMouseOut={() => handleMouseOut(props)} 
                        <a onMouseOut={() => handleMouseOut(props)} onMouseOver={() => handleMouseOver(props)} className={bgClass} onClick={e=>handleClick(e, props)} href="#">
                        {props.status}
                        </a>
                    :
                        <a onMouseOut={() => handleMouseOut(props)} onMouseOver={() => handleMouseOver(props)} className={bgClass} onClick={e=>e.preventDefault()} href="#">
                        {props.status}
                        </a>
            :
                <div className={bgClass}> 
                    {/* {props.id}  */}
                    {props.status}
                </div>
            }
        </React.Fragment>

    );
}

const mapStateToProps = state => {
    // console.log(state.schedule);
    return state;
};

export default connect(mapStateToProps)(CalendarCell);


{/* return (
        <a className='cal-cell cell-font' onClick={e=>handleClick(e, props)} href="#">
            <div onMouseOver={() => handleHover(props)} className='cal-cell cell-font'> 
                {props.id} {props.status}
            </div>
        </a>
        
    ); */}
