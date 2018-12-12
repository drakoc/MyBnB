import React, {Component} from 'react';
import {Navigator} from 'react-onsenui';
import {connect} from 'react-redux';
import StartPage from '../StartPage';

class App extends Component {

    render() {

        return (
            <Navigator
                key='main_navigator'
                initialRoute={{component: StartPage, props: {key: 'login'}}}
                renderPage={this.renderPage}
            />
        );
    }

    renderPage(route, navigator) {
        const props = route.props || {};
        props.mainNavigator = navigator;

        return React.createElement(route.component, props);
    }
}


export default connect()(App);
