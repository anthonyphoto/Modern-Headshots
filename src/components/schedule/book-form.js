import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, SubmissionError, focus} from 'redux-form';
import {bookEvent} from '../../actions/schedule';
import Input from '../common/input';
import {required, nonEmpty, validPhone, length} from '../common/validators';
import {normalizePhone} from '../common/normalizers';

import './book-page.css';
import '../common/form.css';

const titleLength = length({min: 3, max: 25});

export class BookForm extends React.Component {

    componentDidMount() {

    }

    onSubmit(values) {
        const {eventTitle, eventPhone, specialNote} = values;

        const eventId = this.props.currEvent.id;

        const event = {
            shootType: "Headshots",
            eventPhone,
            eventTitle,
            specialNote
        }
        this.props.dispatch(bookEvent(eventId, event));
    }

    render() {
        const {id:userid, username:email} = this.props.currUser;
 
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
            </form>
        );
    }
}

const mapStateToProps = state => {

    // const {currEvent} = state.schedule;
    return {
        currUser: state.auth.currentUser,
        // events,
        currEvent: state.schedule.currEvent,
        // timeZone,
        // loading,
        // error,
        // redirect,
    };
};

export default reduxForm({
        form: 'book',
        onSubmitFail: (error, dispatch) => dispatch(focus('book', Object.keys(error[0])))
    })(connect(mapStateToProps)(BookForm));

