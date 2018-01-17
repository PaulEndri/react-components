import * as React from 'react';
import { DataGridHeaderRow } from './dataGridHeaderRow';
import { DataGridHeaderFilter } from './dataGridHeaderFilter'; 

export default class DataGridHeader extends React.Component {
    constructor(props) {
        super(props);

        this.sort.bind(this);
        this.keyPress.bind(this);
        this.filterColumn.bind(this);
        this.filterChange.bind(this);
    }

    componentDidMount() {
        let defaultSort = this.props.defaultSort;

        if(defaultSort) {
            this.sort(defaultSort);
        }
    }

    sort(column) {
        let order = 'desc';
        let newData = this.props.data.sort((a, b) => {
            let aVal = a[column.key[0]];
            let bVal = b[column.key[0]];

            return bVal > aVal ? -1 : aVal > bVal ? 1 : 0;
        });

        if (this.props.order !== undefined && this.props.order !== "") {
            order = this.props.order === 'asc' ? 'desc' : 'asc';
        } else if(column.sort !== undefined && column.sort !== null) {
            order = column.sort;
        }

        if (order === 'desc') {
            newData.reverse();
        }

        this.props.setParentState({
            data: newData,
            sort: column,
            order: order
        });
    }

    keyPress(keyCode, col) {
        if (keyCode === 13) {
            let value = this.state.filters[col.key.join('')];

            this.filterColumn(value, col);
        }
    }

    filterChange(val, col) {
        let key = col.key.join('');
        let filtered = this.state.filters[key] || '';

        if (filtered !== val) {
            this.filterColumn(val, col);
        }
    }

    filterColumn(val, col) {
        this.props.setParentState({
            filters: {
                ...this.state.filters,
                [col.key.join('')]: val
            }
        })
    }

    render() {
        const props = this.props;

        return <thead>
            <GridHeaderFilter
                columns        = { props.columns }
                setParentState = { (v) => props.setParentState(v) }
                filters        = { props.filters }
                async          = {props.async || false}
            />
            <GridHeaderRow
                columns        = {props.columns}
                setParentState = {(v)  => props.setParentState(v)}
                data           = {props.data}
                order          = {props.order}
                sort           = {props.sort}
                async          = {props.async || false}
            />
        </thead>
    }
}