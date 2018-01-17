import * as React from 'react';
import { DataGridRow } from './children/dataGridRow';
import { DataGridHeader } from './children/dataGridHeader';
import { DataGridPaginator } from './children/dataGridPaginator';

/**
 * Please note - this class ONLY for CLIENT SIDE filtering
 * Relies heaivly on an internal, standalone state
 */
export class DataGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:     false,
            page:     0,
            pageSize: 25,
            order:    '',
            sort:     false,
            filters:  {}
        };
    }

    processFilters(data) {
        var filteredResults = [];

        for(var filter in this.state.filters) {
            let value = this.state.filters[filter];
            let keys  = filter.split("||");

            if (value) {
                filteredResults = data.filter(haystack => {
                    for(let key of keys) {
                        haystack = haystack !== null && haystack[key] !== null ? haystack[key] : null;
                    }

                    if(haystack === null) {
                        return false;
                    }

                    haystack = String(haystack).toLowerCase();
                    let needles  = value.toLowerCase().split(' ');
                    let totals   = needles.length;
                    let results  = needles.filter(needle => haystack.indexOf(String(needle).toLowerCase()) >= 0) || [];

                    return results.length === totals;
                });
            }
        }

        return filteredResults;
    }

    render() {
        const props       = this.props;
        let   data        = Object.assign([], (this.state.data || props.data));
        let   defaultSort = this.state.sort === false ? props.columns.find(c => c.sort !== null && c.sort !== null) : false;
        let   filters     = Object.keys(this.state.filters);

        if (props.loading === true) {
            return <div>Loading</div>
        }

        if(filters.length > 0) {
            data = this.processFilters(data)
        }

        if (data.length === 0 && props.data.length === 0) {
            return <div className="grid-container">
                <span className="grid-container-notice">
                    No Data Found
                </span>
            </div>;
        } else if (data.length === 0 || !data) {
            data = [{}];
        }

        var page         = this.state.page;
        var pageSize     = this.state.pageSize;
        var startingItem = (page * pageSize);
        var keys         = Object.keys(data[0]);
        var rendering    = data.slice(startingItem, startingItem+pageSize);

        if (rendering.length > pageSize) {
            rendering = rendering.slice(0, pageSize);
        }

        return <div className="grid-container">
            <GridPaginator
                length         = {data.length}
                page           = {page}
                data           = {data}
                setParentState = {(v) => this.setState(v)}
            />
            <table className="grid">
                <GridHeader
                    columns        = {this.props.columns}
                    filters        = {this.state.filters}
                    data           = {data}
                    order          = {this.state.order}
                    sort           = {this.state.sort}
                    setParentState = {v => this.setState(v)}
                    defaultSort    = {defaultSort}
                />
                <tbody>
                    {rendering.map(datum => {
                        return <GridRow data={datum} columns={props.columns} key={datum.id}/>;
                    })}
            </tbody>
            </table>
        </div>;
    }
}

DataGrid.propTypes = {
    loading:   PropTypes.bool,
    data:      PropTypes.array.isRequired,
    columns:   PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        key:   PropTypes.arrayOf(PropTypes.string),
        type:  PropTypes.string,
        sort:  PropTypes.string
    })).isRequired,
};

export default DataGrid;