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
            error = <span className="form-error fi">{this.props.meta.error}</span>;
        }

        let warning;
        if (this.props.meta.touched && this.props.meta.warning) {
            warning = (
                <span className="form-warning fi">{this.props.meta.warning}</span>
            );
        }
        
        // let inp = {}
        // if (this.props.defaultValue) {
        //     Object.keys(this.props.input).forEach(key => 
        //         (key === "value") ? inp["defaultValue"] = this.props.defaultValue : inp[key] = this.props.input[key]
        //     );
        // } 
        // else {
        //     inp = this.props.input;
        // }

        return (
            <div className="form-input">
                <label htmlFor={this.props.input.name}>
                    {this.props.label}
                    {
                        this.props.required?
                        <span className='req'> *</span> : <span></span>
                    }
                    {error}
                    {warning}
                </label>
                <Element
                    {...this.props.input}
                    id={this.props.input.name}
                    type={this.props.type}
                    className={this.props.className}
                    placeholder={this.props.placeholder}
                    rows={this.props.rows}
                    ref={input => (this.input = input)}
                />
            </div>
        );
    }
}
                    
// {...this.props.input}
