import React, {Component} from 'react';
import ExploreList from '../ExploreList';
import {Navigator} from 'react-onsenui';

class ExploreNavigator extends Component {

    render() {
        return (
            <Navigator
                key='explorer_navigator'
                initialRoute={{component: ExploreList}}
                renderPage={this.renderPage}
            />
        );
    }

    renderPage(route, navigator) {
        const props = route.props || {};
        props.exploreNavigator = navigator;
        return React.createElement(route.component, props);
    }
}

export default ExploreNavigator
