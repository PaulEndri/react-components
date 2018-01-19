import React from 'react';
import Input from '../input/Input';
import { isNullOrUndefined, isNull } from 'util';

/**
 * Leaving this as a WIP, there's a lot I dislike about it.
 */
class Form extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.defaultChangeHandler.bind(this);
        this.renderField.bind(this);
        this.handleSubmit.bind(this);
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
    }

    defaultChangeHandler(e, field) {
        this.setState({
            [field.key] : e.target.value
        });
    }

    handleSubmit(event) {
        const props = this.props;
        const state = this.state;

        if(!isNullOrUndefined(props.trigger) && props.async === true) {
            return props.handler(props.id);
        } else if (!isNullOrUndefined(props.handler)) {
            return props.handler(state);
        }

        console.log("Submitted form: " + props.id)
        return null;
    }

    handleChange(event, field) {
        const props = this.props;

        if(!isNullOrUndefined(field.handler)) {
            return field.handler(event, field);
        } else if(!isNullOrUndefined(props.fieldHandler)) {
            return props.fieldHandler(event, field);
        }

        this.setState({
            [field.name] : event.target.value
        });
    }

    renderField(field) {
        const props = this.props;

        if(this.inputFields.includes(field.type)) {
            return <Input
                key       = {props.id + field.label}
                disabled  = {field.disabled === true}
                label     = {field.label}
                className = {field.className}
                trigger   = {"onChange"}
                handler   = {(e) => this.handleChange(e)}
            />
        } else if(React.isValidElement(field)) {
            return field;
        } else {
            throw new Error("As of yet unsupported field type");
        }
    }

    render() {

        return <div className={(props.formClass || "form-container") + props.id}>
            <form className="form-element" onSubmit={(e) => this.handleSubmit(e)}>
                {
                    props.fields.map(f => this.renderField(f))
                }
            </form>
        </div>;
    }
}

export default FOrm;