import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import {bookEvent} from '../../actions/schedule';
import Input from '../common/input';
import {required, nonEmpty, validPhone, length} from '../common/validators';
import {normalizePhone} from '../common/normalizers';

import './book-page.css';
import '../common/form.css';
import {Link} from 'react-router-dom';

const titleLength = length({min: 3, max: 25});

export class BookForm extends React.Component {

    componentDidMount() {

    }

    onSubmit(values) {
        const {eventTitle, eventPhone, specialNote} = values;
        console.log("passed values:", eventTitle, specialNote);

        const eventId = this.props.currEvent.id;

        const event = {
            shootType: "Headshots",
            eventPhone,
            eventTitle,
            specialNote
        }
        console.log(eventId, event);
        this.props.dispatch(bookEvent(eventId, event));
    }

    /* defing sign-in or sign-up */
 
    render() {
        const {id:userid, firstName, lastName, phone, username:email} = this.props.currUser;
        console.log("currUser", userid, email);
        console.log("currEvent", this.props.currEvent);
 
        return (
            <form className="form mgt-2" onSubmit={this.props.handleSubmit(values=>
            this.onSubmit(values))}>

                <Field
                    component={Input} 
                    label="Event Title"
                    type="text" 
                    name="eventTitle"
                    required
                    placeholder="e.g. Diane's Headshots"
                    validate={[required, nonEmpty, titleLength]}
                />

                <Field label="Phone" component={Input} 
                    type="text" 
                    name="eventPhone" 
                    required
                    placeholder="e.g. 888-555-1234"
                    validate={validPhone} 
                    normalize={normalizePhone}
                />

                <Field
                    component={Input} 
                    label="Special Note"
                    element="textarea"
                    type="text" 
                    name="specialNote"
                    rows="7"
                    placeholder="Please write special instructions if any (optional)"
                />        

                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    BOOK
                </button>

                {/* <Field /> */}

                {
        // "photoLink": [],
        // "sessionDate": "2019-03-04T14:00:01.000Z",
        // "shootType": "Headshots",
        // "eventTitle": "Diane's Headshots2",
        // "price": 52,
        // "status": "Booked2",
        // "submitter": "5c7bf1d2936fd96128c2802c",
        // "specialNote": "I need an outdoor shot again.",
    }
            </form>
        );
    }
}

const mapStateToProps = state => {

    const {events, currEvent, timeZone, loading, error, redirect} = state.schedule;
    // console.log("curr", currEvent);
    // console.log("state", state);

    return {
        currUser: state.auth.currentUser,
        events,
        currEvent,
        timeZone,
        loading,
        error,
        redirect,
    };
};

export default reduxForm({
    form: 'book',
    onSubmitFail: (error, dispatch) => dispatch(focus('book', Object.keys(error[0])))
})(connect(mapStateToProps)(BookForm));

// export default connect(mapStateToProps)(BookForm);
// export default requiresLogin()(connect(mapStateToProps)(SchedulePage));
// currEvent: state.schedule.events[0],
// date: state.schedule.events[0].sessionDate,
