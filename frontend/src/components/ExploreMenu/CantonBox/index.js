import React, {Component} from 'react';
import {connect} from 'react-redux'
import CantonList from '../CantonList';
import './index.css';

class CantonBox extends Component {
    render() {
        return (
            <div className='img_container' onClick={this.clickHandler}>
                <img className='img-valign' alt="canton's coat of arms" src={this.props.url}/>
                <span className='text'>{this.props.cantonName}</span>
            </div>
        )
    }

    clickHandler = () => {
        const canton = this.props.canton;
        const cantonList = `cantonList-${canton}`;
        return this.props.exploreNavigator.pushPage({
            component: CantonList,
            props: {
                key: cantonList,
                canton: this.props.canton,
                cantonName: this.props.cantonName
            }
        })
    }
}

export default connect()(CantonBox)
