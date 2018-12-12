import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Page, Toolbar, BackButton, ProgressCircular, LazyList, ListItem} from 'react-onsenui';
import {fetchProperties} from '../../../store/actions/properties';
import './index.css';
import ons from 'onsenui'

import {RENTAL_RANGE} from '../../../constants';
import PropertyDisplay from '../PropertyDisplay';

class CantonList extends Component {

    componentDidMount() {
        const canton = this.props.canton;
        this.props.fetchProperties(canton);
    }

    renderToolbar = () => {
        return (
            <Toolbar>
                <div className='center'>{this.props.cantonName}</div>
                <div className="left"><BackButton>Back</BackButton></div>
            </Toolbar>
        )
    };

    render() {
        if (!this.props.houses.hasOwnProperty('list')) {
            return (
                <Page renderToolbar={this.renderToolbar}>
                    <ProgressCircular indeterminate className='progress-centered'/>
                </Page>
            )
        } else {
            return (
                <Page renderToolbar={this.renderToolbar}>
                    <LazyList
                        length={this.props.houses.list.length}
                        renderRow={this.renderRow}
                        calculateItemHeight={() => ons.platform.isAndroid() ? 48 : 44}
                    />
                </Page>
            );
        }
    }


    renderRow = (index) => {

        const listHouses = this.props.houses.list;
        const currentHouse = listHouses[index];
        const rentalPeriod = RENTAL_RANGE[`${currentHouse.rental_period}`]

        const clickHandle = () => {
            return this.props.exploreNavigator.pushPage({
                component: PropertyDisplay,
                props: {
                    houseId: currentHouse.id,
                }
            })
        };


        return (
            <ListItem key={currentHouse.id}>
                <div className='list-item-container' onClick={clickHandle}>
                    <div><img className='list-item-img' src={currentHouse.photo1} alt='apartment'/></div>
                    <div className='list-text-container'>
                        <div className='list-item-type'>{currentHouse.housing_type}</div>
                        <div className='list-item-title'>
                            <span className='list-item-titles'>{currentHouse.city}</span>
                            <span className='list-item-titles'>{currentHouse.post_number}</span>
                        </div>
                        <div className='list-item-description'>
                            <span className='list-item-description-tile'>{rentalPeriod}</span>
                            <span className='list-item-description-tile'>{currentHouse.rooms} rooms</span>
                            <span className='list-item-description-tile'>{currentHouse.sqm} sqm</span>
                        </div>
                    </div>
                </div>
            </ListItem>
        );
    };
}

const mapStateToProps = (state) => {
    let houses = [];
    if (state.houses) {
        houses = state.houses;
    }
    return {houses};
};

const mapDispatchToProps = (dispatch) => ({
    fetchProperties: (data) => dispatch(fetchProperties(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CantonList);
