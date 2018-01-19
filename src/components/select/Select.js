import React from 'react';
import PropTypes from 'prop-types';
import { isNullOrUndefined } from 'util';

class Select extends React.Component {
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

    render() {
        const props = this.props;
        var action  = {};
        var value   = this.state.value;

        if (props.trigger && props.disabled === false) {
            action[props.trigger] = props.handler;
            value = props.value;
        } else if(props.disabled !== true) {
            action['onChange'] = (v) => this.defaultChange(v);
        }

        return <div className={ "select-container " + (props.className || "") }>
            <select className="select-input" name={ pros.selectName } value={ value || "" }  {...action}>
                <option value = ""></option>
                {props.options.map(o => {
                    return <option value={o.value}>{o.label}</option>;
                })}
            </select>
        </div>;
    }
}

Select.propTypes = {
    disabled:   PropTypes.bool,
    options:    PropTypes.arrayOf(PropTypes.shape({
        label:  PropTypes.string,
        value:  PropTypes.any
    })),
    selectName: PropTypes.string,
    className:  PropTypes.string,
    trigger:    PropTypes.string,
    handler:    PropTypes.func
}

export default Select;