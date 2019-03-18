import React from 'react';
import {connect} from 'react-redux';
import {fetchCancelEvent} from '../../actions/schedule';
import {Link} from 'react-router-dom';
import './myacct-page.css';

export class MyeventCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            confirmCancelRequest: false
        }
    }

    confirmDeleteRequest(e) {
        e.preventDefault();
        this.setState(Object.assign({}, this.state, {
            confirmCancelRequest: true
        }));
    }
    
    cancelDeleteRequest(e) {
        e.preventDefault();
        this.setState(Object.assign({}, this.state, {
            confirmCancelRequest: false
        }));
    }

    confirmDelete(e){
        e.preventDefault();
        this.props.dispatch(fetchCancelEvent(this.props.id))
    }

    render(){
        /* Show cancel request page */
        if (this.state.confirmCancelRequest){
            return (
                <div className="event-box bg-gray fi">
                    <div>
                        <div className="ma-h5">
                            Do you want to cancel this session?
                        </div>
                        <div className="ma-txt">
                            Session Time: {this.props.sessionDate}
                        </div>
                    </div>
                    <div className="ma-spc-l mgt-1">
                        <a onClick={e=>this.confirmDelete(e)} className="ma-btn-lk" href="delete">Delete</a> &nbsp;&nbsp;&nbsp;
                        <a onClick={e=>this.cancelDeleteRequest(e)} className="ma-btn-lk" href="back">Go Back</a>
                    </div>
                </div>
            );
        }

        return (
                <div className="event-box">
                    <div className="ev-title">
                        {this.props.eventTitle}
                    </div>
                    <div className="ev-detail">
                        REF#: {this.props.id.toUpperCase().slice(-8)} &nbsp; | &nbsp;
                        {this.props.eventType==="future"? "Reserved on " : "Updated on "}
                        {this.props.updated}
                        
                    </div>
                    <div className="ev-bottom">
                        <div>{this.props.sessionDate}</div>
                        {   
                            this.props.eventType === "future" ?
                                <a onClick={e => this.confirmDeleteRequest(e)} className="ma-img-lk" href="">
                                    <img src="/img/trash.png" alt="delete" />
                                </a>
                            :
                                this.props.photoYN?
                                    <Link className="ma-btn-lk" to={`/myacct/gallery/${this.props.id}`} >View Photo</Link>
                                :   ""
                        }
                    </div>
                </div>
            );
    }

}

const mapStateToProps = state => {
    return {
        currUser: state.auth.currentUser,
        pastEvents: state.schedule.pastEvents,
        futureEvents: state.schedule.futureEvents
    };
};

export default connect(mapStateToProps)(MyeventCard);
