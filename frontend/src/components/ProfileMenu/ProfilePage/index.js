import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Page, Button, Toolbar, List, ListItem} from 'react-onsenui';

import StartPage from '../../StartPage';
import {removeCurrentUser, fetchCurrentUser} from '../../../store/actions/currentUser';
import './index.css';
import ons from "onsenui";

class ProfilePage extends Component {

    componentDidMount() {
        this.props.dispatch(fetchCurrentUser())
    }


    logOut = () => {
        this.props.dispatch(removeCurrentUser());
        localStorage.clear();
        this.props.mainNavigator.pushPage({component: StartPage})
    };


    clickHandler = () => {
        ons.notification.alert('This option is under construction')
    };

    render() {
        if (this.props.user === undefined) {
            return "Loading..."
        } else {
            return (
                <Page renderToolbar={this.renderToolbar}>
                    <div className='page-container'>
                        <div className='head-container'>
                            <div className='image-container'>
                                <img className='profile-image' alt="User" src={this.props.user.profile.image}/>
                            </div>
                            <div className='profilename-container'>
                                {this.props.user.first_name} {this.props.user.last_name}
                            </div>
                        </div>
                        <div className='body-container'>
                            <List
                                dataSource={[1, 2, 3, 4, 5]}
                                renderRow={this.renderRow}
                            />
                        </div>
                        <div className='profile-button-logout'>
                            <Button onClick={this.logOut}> LOGOUT </Button>
                        </div>
                    </div>
                </Page>

            )
        }
    }

    renderToolbar = () => {
        return (
            <Toolbar>
                <div className='center'>Your Profile</div>
            </Toolbar>
        )
    };

    renderRow = (row, index) => {

        const names = ['Edit Profile', 'Add/edit property', 'FAQ', 'Feedback', 'About'];

        return (
            <ListItem key={index} onClick={this.clickHandler}>
                <div className='left profile-item-name'>
                    {names[index]}
                </div>
                <div className='right profile-item-photo'>
                    <img src={`./icons/icon${index}.svg`} alt="Icon" className='list-item__thumbnail'/>
                </div>
            </ListItem>
        );
    };
}

const mapStateToProps = (state) => {
    return {user: state.currentUser.user}
};

export default connect(mapStateToProps)(ProfilePage);
