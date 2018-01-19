import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input/Input';

class TextArea extends Input {
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
            <label htmlFor={ props.inputName } className={ props.className ? props.className + "-label" : "textarea-label" }>
                { props.label }
            </label>
            <textarea name={ props.inputName } className={ props.className || "textarea" } type={ props.type } value={value} />
        </span>;
    }
}

export default TextArea;