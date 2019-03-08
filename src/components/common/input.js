import React from 'react';

export default class Input extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.meta.active && this.props.meta.active) {
            this.input.focus();
        }
    }

    render() {
        const Element = this.props.element || 'input';
        let error;
        if (this.props.meta.touched && this.props.meta.error) {
            error = <div className="form-error">{this.props.meta.error}</div>;
        }

        let warning;
        if (this.props.meta.touched && this.props.meta.warning) {
            warning = (
                <div className="form-warning">{this.props.meta.warning}</div>
            );
        }
        // // console.log(1, this.props.input);
        // if (this.props.init && !this.props.value){
        //     console.log(4, this.props.name);
        //     this.props.change("phone", this.props.init);
        // }
        // console.log(1, this.props.input.name, this.props.input.value)
//console.log(1, this.state);
        
        return (
            <div className="form-input">
                <label htmlFor={this.props.input.name}>
                    {this.props.label}
                    {error}
                    {warning}
                </label>
                <Element
                    {...this.props.input}
                    id={this.props.input.name}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    ref={input => (this.input = input)
                    }
                />
            </div>
        );
    }
}
