import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
    var action  = {};

    if(props.trigger && props.disabled === false) {
        action[props.trigger] = props.handler;
    } else {
        action.onClick = () => {}
    }
    
    return <div className={"button-container" + (props.className || "")} {...action}>
        <div className="button">
            <i className={props.iconClass} />
            {props.label}
        </div>
    </div>
}

Button.propTypes = {
    disabled:  PropTypes.bool,
    label:     PropTypes.string,
    iconClass: PropTypes.string,
    className: PropTypes.string,
    trigger:   PropTypes.string,
    handler:   PropTypes.func
}

export default Button;