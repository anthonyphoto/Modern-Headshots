import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from '../common/input';
import {login} from '../../actions/auth';
import {required, nonEmpty, email} from '../common/validators';

export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.username, values.password));
    }

    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }

        return (
            <form
                className="form mgt-2"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {error}

                <Field
                    component={Input}
                    label="Username (Email)"
                    type="text"
                    name="username"
                    id="username"
                    placeholder="melody@demo.com"
                    validate={[required, nonEmpty, email]}
                />

                <Field
                    component={Input}
                    label="Password"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="demo"
                    validate={[required, nonEmpty]}
                />
                <button disabled={this.props.pristine || this.props.submitting}>
                Sign in
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
