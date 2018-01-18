import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';

class Confirm extends React.Component {
    renderOptions(props) {
        return <div className="confirm-button-container">
            <Button
                label     = {props.confirmText || "Yes"}
                iconClass = {props.confirmClass || "checkmark"}
                className = {"confirm-button-yes"}
                handler   = {(e) => props.handler(true, e)}
                trigger   = {props.trigger}
            />
            <Button
                label     = { props.confirmText || "No" }
                iconClass = { props.confirmClass || "times" }
                className = { "confirm-button-no" }
                handler   = { (e) => props.handler(false, e) }
                trigger   = { props.trigger}
            />
        </div>
    }

    render() {
        const props = this.props;
        
        return <div className="confirm-modal-container">
            <Modal
                title     = {props.title}
                trigger   = {(e) => props.trigger(false, e)}
                className = {props.className}
                display   = {props.display}
                handler   = {props.handler}
                footer    = {this.renderOptions(props)}
            >
                <div className="confirm-message-body">
                    {props.message}
                </div>
            </Modal>
        </div>
    }
}

Confirm.propTypes = {
    display:   PropTypes.bool,
    title:     PropTypes.string,
    className: PropTypes.string,
    trigger:   PropTypes.string,
    handler:   PropTypes.func
}

export default Confirm;