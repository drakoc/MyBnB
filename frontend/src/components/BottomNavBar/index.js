import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Page, Tabbar, Tab} from 'react-onsenui'
import ExploreNavigator from '../ExploreMenu/ExploreNavigator';
import Messages from '../MessagesMenu/index';
import ProfileNavigator from '../ProfileMenu/ProfileNavigator';
import FavoritesNavigator from '../FavoritesMenu/FavoritesNavigator';

class BottomNavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }

    render() {

        const props = this.props.mainNavigator;

        return (
            <Page>
                <Tabbar
                    mainNavigator={this.props.mainNavigator}
                    animation='none'
                    position='auto'
                    index={this.state.index}
                    onPreChange={event => {
                        if (event.index !== this.state.index) {
                            this.setState({index: event.index})
                        }
                    }}
                    renderTabs={() => this.renderTabs(props)}
                />
            </Page>
        )
    }

    renderTabs(props) {

        return [
            {
                content: <ExploreNavigator key='explore_navigator'/>,
                tab: <Tab key='explore_list' label='Explore' icon='ion-search'/>
            },
            {
                content: <FavoritesNavigator key='favorites_explorer'/>,
                tab: <Tab key='favorites_tab' label='Favorites' icon='ion-heart'/>,
            },
            {
                content: <Messages key='messages_page'/>,
                tab: <Tab key='messages_tab' label='Messages' icon='ion-chatboxes'/>,
            },
            {
                content: <ProfileNavigator key='profile_page' mainNavigator={props}/>,
                tab: <Tab key='profile_tab' label='Profile' icon='ion-person'/>,
            },

        ]
    }

}

// const mapStateToProps = (state) => {
//     return {
//         currentUser: state.currentUser
//     }
// };

export default connect()(BottomNavBar)
