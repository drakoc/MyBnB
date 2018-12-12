import React, {Component} from 'react';
import ProfilePage from '../ProfilePage';
import {Navigator} from 'react-onsenui';
import {connect} from 'react-redux'

class ProfileNavigator extends Component {

    render() {

        return (
            <Navigator
                key='profile_navigator'
                initialRoute={{component: ProfilePage}}
                renderPage={this.renderPage}
            />
        );
    }

    renderPage = (route, navigator) => {

        const props = route.props || {};
        props.navigator = navigator;
        props.mainNavigator = this.props.mainNavigator

        return React.createElement(route.component, props);
    }
}

export default connect()(ProfileNavigator);
