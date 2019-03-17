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

        // console.log(1, this.props);
        
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
                    ref={input => (this.input = input)
                    }
                />
            </div>
        );
    }
}
// value={this.props.predefined}
                    