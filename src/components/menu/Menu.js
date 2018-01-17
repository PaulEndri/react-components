import React from 'react';

/*
    Example data structure for menu items:

        [
            {
                title    : '',
                icon     : '',
                route    : '',
                children : [
                    {
                        title : '',
                        icon  : '',
                        route : ''
                    }
                ]
            }
        ]

    Route/Children are mutually exclusive on the parent level.
    For UI/UX sakes, hard limiting to just one level of nested menus
*/
class Menu extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.renderElement.bind(this);
        this.renderLink.bind(this);
    }

    /**
     * 
     * @param {*} element 
     * @param {bool} child 
     */
    renderElement(element, child = false) {
        return <div className={"menu-item" + (child ? '' : ' child-item')} key={"menuItem"+title+route.replace("/", '_')}>
            <i className={"fa fa-"+element.icon} />
            {this.renderLink(element.route, element)}
            {
                element.children !== null && typeof element.children === 'Array' && element.children.length > 0
                    ? element.children.map(e => this.renderElement(e, true))
                    : null
            }
        </div>;
    }

    /**
     * This method needs to get overriden by the implementation tier of apps (native/redux/web)
     * For specific react-router functionality (react-router-native vs react-router-redux vs react-router)
     * @param {string} route
     * @param {object} element
     */
    renderLink(route, element) {
        return <a href={route}/>;
    }

    render() {
        const props = this.props;

        return <div className={"menu-container" + props.className}>
            {props.items.map(i => this.renderElement(i))}  
        </div>;
    }
}

export default Menu;