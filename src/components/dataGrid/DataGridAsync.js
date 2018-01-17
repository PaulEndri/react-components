import * as React from 'react';
import PropTypes from 'prop-types';
import { uuid } from 'uuid/v4';
import { DataGridRow } from './children/dataGridRow';
import { DataGridHeader } from './children/dataGridHeader';
import { DataGridPaginator } from './children/dataGridPaginator';

/**
 * Please note - this component ONLY for SERVER SIDE filtering
 * This component is stateless by default and needs to be fully implemented by the consumer
 */
export class DataGridAsync extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const props       = this.props;

        if (props.loading === true) {
            return <div>Loading</div>
        }

        return <div className="grid-container">
            <GridPaginator
                length         = {props.data.length}
                page           = {props.page}
                data           = {props.data}
                setParentState = {(v) => props.paginate(v.page)}
            />
            <table className="grid">
                <GridHeader
                    columns        = {props.columns}
                    filters        = {props.filters}
                    data           = {props.data}
                    order          = {props.order}
                    sort           = {props.sort}
                    setParentState = {v => props.update(v)}
                    async          = {true}
                />
                <tbody>
                    {props.data.map(datum => {
                        return <GridRow data={datum} columns={props.columns} key={datum.id+uuid()}/>;
                    })}
            </tbody>
            </table>
        </div>;
    }
}

DataGridAsync.propTypes = {
    loading:   PropTypes.bool,
    page:      PropTypes.number,
    data:      PropTypes.array.isRequired,
    paginate:  PropTypes.func,
    columns:   PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        key:   PropTypes.arrayOf(PropTypes.string),
        type:  PropTypes.string,
        sort:  PropTypes.string
    })).isRequired,
    filters:   PropTypes.string.isRequired,
    order:     PropTypes.string.isRequired,
    sort:      PropTypes.string.isRequired,
    update:    PropTypes.string.isRequired
};

export default DataGridAsync;