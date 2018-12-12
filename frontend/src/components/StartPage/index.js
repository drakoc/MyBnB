import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Page } from 'react-onsenui';

import Login from '../Login';
import BottomNavBar from '../BottomNavBar';

import { verifyAccessToken, refreshToken } from '../../store/actions/loginHelper';
import {fetchFavorites} from "../../store/actions/currentUser";

import './index.css';

class StartPage extends Component {

    componentDidMount = () => {
        setTimeout(()=>{
        this.props.dispatch(verifyAccessToken())
            .then((status) => {
                if (status) {
                    this.props.dispatch(fetchFavorites())
                        .then(() => this.props.mainNavigator.pushPage({ component: BottomNavBar }))
                    return
                } else {
                    this.props.dispatch(refreshToken())
                        .then((status) => {
                            if (status) {
                                this.props.dispatch(fetchFavorites())
                                    .then(() => this.props.mainNavigator.pushPage({ component: BottomNavBar }))
                            } else {
                                this.props.mainNavigator.pushPage({ component: Login })
                            }
                        })
                }
            })
        }, 2000)
    };

    render() {

        return (
            <Page>
                <div className='start-page-container'>
                <img alt="MyBnB" src='./mybnb.png' />
                </div>
            </Page>

        )
    };
}

export default connect()(StartPage);
