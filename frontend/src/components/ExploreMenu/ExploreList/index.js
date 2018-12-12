import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Page, Toolbar} from 'react-onsenui';
import CantonBox from '../CantonBox';
import {CANTONS} from '../../../constants';
import './index.css';

class ExploreList extends Component {

    render() {

        return (
            <Page modifier='page' renderToolbar={this.renderToolbar}>
                <div className='explore-page'>
                    {Object.keys(CANTONS).map((key, i) => {
                        const url = `./cantons/${key}.png`;
                        return <CantonBox key={i} url={url} canton={key} cantonName={CANTONS[key]}
                                          exploreNavigator={this.props.exploreNavigator}/>
                    })}
                </div>
            </Page>
        )
    }

    renderToolbar = () => {
        return (
            <Toolbar>
                <div className="center">Explore...</div>
            </Toolbar>
        )
    }
}

export default connect()(ExploreList)
