import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../../actions/users';
import {login} from '../../actions/auth';
import Input from '../common/input';
import {required, nonEmpty, email, phone, matches, length, isTrimmed} from '../common/validators';
import {normalizePhone} from '../common/normalizers'
const passwordLength = length({min: 5, max: 72});
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
        console.log(1, this.props);
        return (
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <label htmlFor="username">EMAIL</label>
                <Field
                    component={Input}
                    type="email"
                    name="username"
                    placeholder="foo@bar.com"
                    init="anthony011@gmail.com"
                    validate={[required, nonEmpty, isTrimmed, email]}
                />
                <label htmlFor="firstName">FIRST NAME</label>
                <Field component={Input} type="text" name="firstName" />
                <label htmlFor="lastName">LAST NAME</label>
                <Field component={Input} type="text" name="lastName" />
                <label htmlFor="lastName">PHONE</label>
                <Field component={Input} type="text" placeholder="888-555-1234"
                    validate={phone} 
                    normalize={normalizePhone}
                    name="phone" />

                <label htmlFor="password">PASSWORD</label>
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    validate={[required, passwordLength, isTrimmed]}
                />
                <label htmlFor="passwordConfirm">CONFIRM PASSWORD</label>
                <Field
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
