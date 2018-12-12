import React, {Component} from 'react';
import FavoritesList from '../FavoritesList';
import {Navigator} from 'react-onsenui';

class FavoritesNavigator extends Component {


    render() {

        return (
            <Navigator
                key='favorites_navigator'
                initialRoute={{component: FavoritesList}}
                renderPage={this.renderPage}
            />
        );
    }

    renderPage(route, navigator) {
        const props = route.props || {};
        props.favoritesNavigator = navigator;
        return React.createElement(route.component, props);
    }
}

export default FavoritesNavigator
