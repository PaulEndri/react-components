import * as React from 'react';

export default class GridHeaderRow extends React.Component {
    constructor(props) {
        super(props);

        this.sort.bind(this);
    }

    sort(column) {
        const props = this.props;
        let order = 'desc';

        if (props.order !== undefined) {
            order = props.order === 'asc' ? 'desc' : 'asc';
        }

        if(props.async === true) {
            return this.props.setParentState({
                sort:  column,
                order: order
            });
        }

        let newData = props.data.sort((a, b) => {
            let aVal = a;
            let bVal = b;

            for(var key of column.key) {
                aVal = aVal !== null && aVal[key] !== undefined ? aVal[key] : null;
                bVal = bVal !== null && bVal[key] !== undefined ? bVal[key] : null;
            }

            if(column.type !== 'number') {
                aVal = aVal ? String(aVal).toLowerCase() : '';
                bVal = bVal ? String(bVal).toLowerCase() : '';

                if (aVal < bVal) return -1;
                if (aVal > bVal) return 1;
                return 0;
            } else {
                return (+aVal) - (+bVal);
            }
        });

        if (order === 'desc') {
            newData.reverse();
        }

        this.props.setParentState({
            data: newData,
            sort: column,
            order: order
        });
    }

    render() {
        const props = this.props;

        return <tr>
            {props.columns.map(column => {
                let order = column === props.sort ? props.order : '';
                let className = order !== ''
                    ? order === 'asc' ? 'fa fa-angle-up' : 'fa fa-angle-down'
                    : '';

                return <th
                    className = "grid-column sortable"
                    key       = {"tableHeader" + column.title}
                    onClick   = {() => this.sort(column)}
                >
                    <span>
                        {column.title}
                        {' '}
                        <i className={className} />
                    </span>
                </th>;
            })}
        </tr>

    }
}