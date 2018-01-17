import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
    renderFooter() {
        if(this.props.footer !== null && this.props.footer !== undefined) {
            return <div className="modal-footer-container">
                <div className="modal-footer">
                    {this.props.footer}
                </div>
            </div>;
        }

        return null;
    }

    render() {
        const props = this.props;
        
        if(props.display !== true) {
            return null;
        }

        return <div className={props.className || "modal-container"}>
            <ModalHeader
                title   = {props.title}
                handler = {props.handler}
                trigger = {props.trigger}
            />
            <div className="modal-body-container">
                {props.children}
            </div>
            {this.renderFooter()}
        </div>;
    }
}

Modal.propTypes = {
    display:   PropTypes.bool,
    title:     PropTypes.string,
    className: PropTypes.string,
    trigger:   PropTypes.string,
    handler:   PropTypes.func
}

export default Modal;