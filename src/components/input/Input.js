import React from 'react';
import PropTypes from 'prop-types';
import { isNullOrUndefined } from 'util';

class Input extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            value : props.value || null
        };
    }

    defaultChange(v) {
        this.setState({
            value : v
        });
    }

    renderInput(props) {
        if(props.disabled) {
            return this.renderDisabledInput(props);
        }

        var action = {};
        var value  = null;

        if (props.trigger && props.disabled === false) {
            action[props.trigger] = props.handler;
            value = props.value;
        } else {
            action['onChange'] = (v) => this.defaultChange(v);
            value = this.state.value;
        }

        return <span>
            <label htmlFor={ props.inputName } className={ props.className ? props.className + "-label" : "input-label" }>
                { props.label }
            </label>
            <input name={ props.inputName } className={ props.className || "input" } type={ props.type } value={value} />
        </span>;
    }

    renderDisabledInput(props) {
        value = props.value;

        if(isNullOrUndefined(props.trigger)) {
            value = this.state.value;
        }

        return <span>
            <label htmlFor={ props.inputName } className={ props.className ? props.className + "-label" : "input-label" }>
                { props.label }
            </label>
            <span name={ props.inputName } className={ props.className || "input disabled" }>
                { value }
            </span>
        </span>;
    }

    render() {
        const props = this.props;
    
        return <div className={ "input-container " + (props.className || "") }>
            {this.renderInput(props)}
        </div>;
    }
}

Input.propTypes = {
    disabled:  PropTypes.bool,
    label:     PropTypes.string,
    className: PropTypes.string,
    trigger:   PropTypes.string,
    handler:   PropTypes.func
}

export default Input;