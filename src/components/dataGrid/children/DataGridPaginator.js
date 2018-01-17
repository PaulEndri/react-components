import * as React from 'react';=

export default GridPaginator = (props) => {
    const loadPage = (page) => {
        props.setParentState({
            page: page
        });
    }

    if(props.data.length <= 25) {
        return null;
    }

    var page       = props.page;
    var itemNumber = (25 * page) + 1;
    var endItem    = itemNumber + 24;
    var hasNext    = props.data.length > endItem;

    return <div className="grid-pagination-paginator">
        <div className="grid-pagination-previous">
            {
                page !== 0 &&
                <span onClick={ () => loadPage(page - 1) }><i className="fa fa-chevron-left"></i></span>
            }
        </div>

        <div className="grid-page-number-options page-size-selector-container">
            <span>{ itemNumber } - { Math.min(endItem, props.data.length) } of { props.data.length }</span>
        </div>
        <div className="grid-pagination-next">
            {
                hasNext === true &&
                <span onClick={ () => loadPage(page + 1) }><i className="fa fa-chevron-right"></i> </span>
            }
        </div>
    </div>;
}