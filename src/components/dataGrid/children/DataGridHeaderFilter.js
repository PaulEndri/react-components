import * as React from 'react';
import axios from 'axios';

export default class DataGridHeaderFilter extends React.Component {
    constructor(props) {
        super(props);

        this.keyPress.bind(this);
        this.filterColumn.bind(this);
        this.filterChange.bind(this);
    }

    keyPress(keyCode, col) {
        if (keyCode === 13) {
            let value = this.props.filters[col.key.join('||')];

            this.filterColumn(value, col);
        }
    }

    filterChange(val, col) {
        let key = col.key.join('');
        let filtered = this.props.filters[key] || '';

        if (filtered !== val) {
            this.filterColumn(val, col);
        }
    }

    filterColumn(val, col) {
        this.props.setParentState({
            filters: {
                ...this.props.filters,
                [col.key.join('||')]: val
            }
        })
    }

    render() {
        const props = this.props;

        return <tr>
            {props.columns.map(column => {
                let value = props.filters[column.key.join("||")];

                return <th className="grid-filter-header" key={column.key.join("-")+"-filter-header"}>
                    <input
                        name       = {column.key.join('')}
                        onChange   = {e => this.filterChange(e.target.value, column)}
                        onKeyPress = {e => this.keyPress(e.charCode, column)}
                    />
                </th>;
            })}
        </tr>
    }
}