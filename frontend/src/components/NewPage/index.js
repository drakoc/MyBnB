// Testing Page
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Page, Toolbar} from 'react-onsenui';
import './index.css';

class NewPage extends Component {

    render() {

        return (

            <Page>
                <Toolbar>
                    <div className="center">Under construction</div>
                </Toolbar>
                <div className='container'>
                    Under Construction
                </div>
            </Page>

        )
    }
}

export default connect()(NewPage);
