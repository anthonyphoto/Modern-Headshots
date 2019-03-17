import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../../actions/users';
import {login} from '../../actions/auth';
import Input from '../common/input';
import {required, nonEmpty, email, validPhone, matches, length, isTrimmed} from '../common/validators';
import {normalizePhone} from '../common/normalizers';
import '../common/form.css';

const passwordLength = length({min: 4, max: 72});
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const {username, password, phone, firstName, lastName} = values;
        const user = {username, password, phone, firstName, lastName};
        return this.props
            .dispatch(registerUser(user))
            .then(usr => {
                // console.log('usr', usr);
                this.props.dispatch(login(username, password));
            });
    }
    render() {
        // console.log(1, this.props);
        return (
            <form
                className="form mgt-2"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>

                <Field
                    component={Input}
                    label="Email"
                    type="email"
                    name="username"
                    placeholder="foo@bar.com"
                    init="anthony011@gmail.com"
                    validate={[required, nonEmpty, isTrimmed, email]}
                />
                <Field label="First Name" component={Input} type="text" name="firstName" />
                <Field label="Last Name" component={Input} type="text" name="lastName" />
                <Field label="Phone" component={Input} type="text" placeholder="888-555-1234"
                    validate={validPhone} 
                    normalize={normalizePhone}
                    name="phone" />

                <Field
                    label="Password"
                    component={Input}
                    type="password"
                    name="password"
                    validate={[required, passwordLength, isTrimmed]}
                />
                <Field
                    label="Confirm Password"
                    component={Input}
                    type="password"
                    name="passwordConfirm"
                    validate={[required, nonEmpty, matchesPassword]}
                />
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    SIGN UP
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
