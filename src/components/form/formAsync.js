import React from 'react';
import Input from '../input/Input';

/**
 * This component is meant exclusively for async forms
 * where the vast majority of the logic will get handeled externally
 * This is probably a boilerplate/early version and will get updated later
 * 
 * Leaving this as a WIP
 */
class FormAsync extends React.Component {
    get fieldMap() {
        return
    }

    get inputFields() {
        return [
            'number',
            'text',
            'input',
            'url',
            'email'
        ]
    }

    constructor(props, context) {
        super(props, context);

        this.renderElement.bind(this);
        this.renderLink.bind(this);
    }

    renderField(field) {
        if(this.inputFields.includes(field.type)) {
            return <Input
                disabled 
                label: PropTypes.string,
                iconClass: PropTypes.string,
                className: PropTypes.string,
                trigger: PropTypes.string,
                handler: PropTypes.func
            />
        }
    }

    render() {
        const props = this.props;

        return <div className={props.formClass || "form-container"}>
            <form className="form-element" onSubmit={(e) => this.handleSubmit(e)}>
                {
                    props.fields.map(f => this.renderField(f))
                }
            </form>
        </div>;
    }
}

export default Menu;