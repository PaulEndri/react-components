import React from 'react';
import PropTypes from 'prop-types';

const ModalHeader = (props) => {
    const props = this.props;
    var action = {};

    action[props.trigger] = props.handler;

    return <div className="modal-header-container">
        <div className="modal-header-content">
            {props.title}
        </div>
        <div className="modal-header-exit" {...action}>
            <i className="fa fa-times fa-2x"/>
        </div>
    </div>;
}

ModalHeader.propTypes = {
    title:     PropTypes.string,
    trigger:   PropTypes.string,
    handler:   PropTypes.func
}
export default ModalHeader;