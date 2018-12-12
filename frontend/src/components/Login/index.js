import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Page, Input, Button} from 'react-onsenui';
import BottomNavBar from '../../components/BottomNavBar';
import { fetchFavorites} from '../../store/actions/currentUser';
import {loginAction} from "../../store/actions/loginHelper.js";
import ons from 'onsenui';
import './index.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    handleEmailChange = (e, username) => {
        this.setState({username: e.target.value})
    };
    handlePasswordChange = (e, password) => {
        this.setState({password: e.target.value})
    };

    handleSubmit = (e) => {
        this.props.dispatch(loginAction({...this.state}))
        .then(status => {
            if (status==="password"){
                ons.notification.alert('Wrong email or password')
            } else if (status==="server"){
                ons.notification.alert('Can\'t connect to server!')
            } else if (status==="ok"){
                this.props.dispatch(fetchFavorites())
                    .then(() => this.props.mainNavigator.pushPage({component: BottomNavBar}))
            }})
    };

    render() {
        return (
            <Page>
                <div className='login-container'>
                    <form>
                        <section style={{textAlign: 'center'}}>
                            <div className='login-immage-container'>
                                <img className='login-icon' alt='login icon' src='./mybnb.png'/>
                            </div>
                            <p>
                                <Input
                                    className="login-input"
                                    onChange={this.handleEmailChange}
                                    value={this.state.username}
                                    modifier='underbar'
                                    float
                                    autoComplete='on'
                                    placeholder='Email'
                                />
                            </p>
                            <p>
                                <Input
                                    className="login-input"
                                    onChange={this.handlePasswordChange}
                                    value={this.state.password}
                                    modifier='underbar'
                                    type='password'
                                    float
                                    autoComplete='on'
                                    placeholder='Password'
                                />
                            </p>
                            <p className='login-button'>
                                <Button onClick={this.handleSubmit}>
                                    Sign In
                                </Button>
                            </p>
                            <p className='login-accounts'>
                                <p className='login-text'>
                                    Forgot your password?
                                </p>
                                <p className='login-text'>
                                    Open account
                                </p>
                            </p>
                        </section>
                    </form>
                </div>
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        currentStatus: state.currentStatus,
    }
};

export default connect(mapStateToProps)(Login);
