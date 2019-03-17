import React from 'react';
import {connect} from 'react-redux';
import {clickEvent, hoverEvent} from '../../actions/schedule';
import './calendar.css';





export class CalendarCell extends React.Component {

    handleClick(e) {
        // console.log(props);
        e.preventDefault();
        this.props.dispatch(clickEvent([this.props.day, this.props.hr]));
        // this.props.history.push('/book');
        // this.props.history.push(`/book/${this.props.day}${this.props.hr}`);
        console.log('clicked');
    }
    
    handleMouseOver() {
        this.props.dispatch(hoverEvent([this.props.day, this.props.hr]));
        // console.log('hover', this.props.statuthis.s);
    }

    handleMouseOut() {
        this.props.dispatch(hoverEvent(""));
  
    }

    render(){

        let bgClass = 'cal-cell cell-font';
        switch (this.props.status) {
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
            <div>
                { this.props.id?
                        this.props.status === 'Available'?
                            <a onMouseOut={() => this.handleMouseOut()} onMouseOver={() => this.handleMouseOver()} className={bgClass} onClick={e=>this.handleClick(e)} href="#">
                            {this.props.status}
                            </a>
                        :
                            <a onMouseOut={() => this.handleMouseOut()} onMouseOver={() => this.handleMouseOver()} className={bgClass} onClick={e=>e.preventDefault()} href="#">
                            {this.props.status}
                            </a>
                :
                    <div className={bgClass}> 
                        {this.props.status}
                    </div>
                }
            </div>

        );
    }
}

const mapStateToProps = state => {
    // console.log(state);
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
