import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input/Input';
import { uuid } from 'uuid/v4';

class SmartSelect extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.setState({
            activeFilter : "",
            value        : ""
        });

        this.onChange.bind(this);
        this.renderOptions.bind(this);
        this.getHandler.bind(this);
    }

    getHandler() {
        if(this.props.disabled === true) {
            return;
        }

        if(this.props.handler) {
            return (e) => this.props.handler(e.target.value, e);
        }
    
        return (e) => this.onSelect(e);
    }

    onSelect(event) {
        this.setState({
            value : event.target.value
        });

        return event.target.value;
    }

    onChange(event) {
        this.setState({
            activeFilter : event.target.value
        });
    }

    renderOptions() {
        let filter  = this.state.activeFilter;
        let data    = this.props.options;
        let id      = this.props.id;
        let filters = filter.split(" ");
        let trigger = this.props.trigger || "onClick";
        let handler = this.getHandler();

        return <div className="smart-select-options">
            {
                data.filter(datum => {
                    if (filters.length > 1) {
                        for (let _filter of filters) {
                            let match = 0;

                            if (datum.label.indexOf(filter) >= 0) {
                                match++;
                            }

                            return match === filters.length;
                        }
                    }

                    return datum.label.indexOf(filter) >= 0;
                }).map(datum => {
                    let action = {
                        [trigger] : (e) => this.props.handler(e)
                    };

                    return (<div className="smart-select-option" {...action}>
                        {datum.label}
                    </div>)
                })
            }
        </div>;
    }

    render() {
        const props = this.props;
        var value   = this.state.value;

        return <div className={ "smart-select-container " + (props.className || "" + ` ${props.id}`) }>
            <div className="smart-select">
                <Input
                    className="smart-select-input"
                    type="text"
                    trigger="onChange"
                    value={this.state.activeFilter}
                    disabled={props.disabled}
                    label=""
                />
                {this.renderOptions()}
            </div>
        </div>;
    }
}

SmartSelect.propTypes = {
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