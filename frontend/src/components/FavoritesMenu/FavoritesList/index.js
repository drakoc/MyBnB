import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Page, Toolbar, LazyList, ListItem} from 'react-onsenui';
import ons from 'onsenui';
import {RENTAL_RANGE} from '../../../constants';
import FavoritesPropertyDisplay from '../FavoritesPropertyDisplay';
import {urlBase} from '../../../store/constants'
import {fetchFavorites} from "../../../store/actions/currentUser";
import './index.css';

class FavoritesList extends Component {

    componentDidMount = () => {
        this.props.fetchFavorites()
    }

    render() {

        if (this.props.favorites.length === 0) {
            return (
                <Page renderToolbar={this.renderToolbar}>
                    <div className='favorites-no'>
                        You have no favorites
                    </div>
                </Page>
            )
        } else {
            return (
                <Page className='page' renderToolbar={this.renderToolbar}>
                    <LazyList
                        length={this.props.favorites.length}
                        renderRow={this.renderRow}
                        calculateItemHeight={() => ons.platform.isAndroid() ? 48 : 44}
                    />
                </Page>
            )
        }
    }a

    renderRow = (index) => {

        const listHouses = this.props.favorites;
        const currentHouse = listHouses[index];
        const rentalPeriod = RENTAL_RANGE[`${currentHouse.rental_period}`]

        const clickHandle = () => {
            return this.props.favoritesNavigator.pushPage({
                component: FavoritesPropertyDisplay,
                props: {
                    houseId: currentHouse.id,
                }
            })
        };

        return (
            <ListItem key={currentHouse.id}>
                <div className='list-item-container' onClick={clickHandle}>
                    <div><img className='list-item-img' src={`${urlBase}${currentHouse.photo1}`} alt='apartment'/></div>
                    <div className='list-text-container'>
                        <div className='list-item-type'>{currentHouse.housing_type}</div>
                        <div className='list-item-title'>
                            <span className='list-item-titles'>{currentHouse.city}</span>
                            <span className='list-item-titles'>{currentHouse.post_number}</span>
                        </div>
                        <div className='list-item-description'>
                            <span className='list-item-description-tile'>{rentalPeriod}</span>
                            <span className='list-item-description-tile'>{currentHouse.bathroom} bathroom</span>
                            <span className='list-item-description-tile'>{currentHouse.rooms} rooms</span>
                            <span className='list-item-description-tile'>{currentHouse.sqm} sqm</span>
                        </div>
                    </div>
                </div>
            </ListItem>
        );
    }

    renderToolbar = () => {
        return (
            <Toolbar>
                <div className='center'>Favorites</div>
            </Toolbar>
        )
    }
}

const mapStateToProps = state => {

    return {
        favorites: state.currentUser.favorites,
        currentStatus: state.currentStatus,
        currentUser: state.currentUser,
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchFavorites: (data) => dispatch(fetchFavorites()),
})

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesList);
