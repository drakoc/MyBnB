import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Page, Toolbar} from 'react-onsenui';
import './index.css';

class Messages extends Component {

    render() {

        return (

            <Page renderToolbar={this.renderToolbar}>
                <div className='container'>
                    Under Construction
                </div>
            </Page>

        )
    }

    renderToolbar = () => {
        return (
            <Toolbar>
                <div className="center">Messages</div>
            </Toolbar>
        )
    }
}

export default connect()(Messages);
