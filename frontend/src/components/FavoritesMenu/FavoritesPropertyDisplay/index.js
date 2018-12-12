import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Page, Toolbar, Button, BackButton, Carousel, CarouselItem} from 'react-onsenui'
import './index.css';
import {CANTONS, RENTAL_RANGE} from '../../../constants';
import {removeFromFavorites} from '../../../store/actions/currentUser';
import ons from 'onsenui';
import {urlBase} from '../../../store/constants';


class FavoritesPropertyDisplay extends Component {

    constructor(props) {
        super(props);

        const house = this.props.house;
        let items = [];
        Object.keys(house).map(key => {
            const regex = /photo/g;
            if (key.match(regex) && house[key] !== null) {
                items.push(house[key]);
            }
            return "ok"
        });

        const listOfFavorites = this.props.favorites;
        const favorited = !!listOfFavorites.find(item => item.id === props.houseId);

        this.state = {
            favorited,
            items,
            index: 0
        }
    }

    handleChange = (e) => {
        return this.setState({index: e.activeIndex});
    };

    renderToolbar() {
        return (
            <Toolbar>
                <div className="left"><BackButton>Back</BackButton></div>
            </Toolbar>
        );
    }

    setIndex(index) {
        this.setState({index: index});
    }

    handleRemoveFavoriteClick = () => {
        this.props.favoritesNavigator.popPage().then(() => {
            this.props.dispatch(removeFromFavorites(this.props.houseId))
        })
    };

    handleSendMsgToOwner = () => {
        ons.notification.alert('This option is under construction')
    };

    render() {
        return (
            <Page renderToolbar={this.renderToolbar}>
                <div className='favorites-carousel-container'>
                    <Carousel
                        onPostChange={this.handleChange}
                        ref={(carousel2) => { this.carousel = carousel2; }}
                        index={this.state.index}
                        swipeable
                        autoScroll>
                        {this.state.items.map((item, index) => (
                            <CarouselItem key={index}>
                                <div className='img-container'>
                                    <img src={`${urlBase}${item}`} alt='' className='img-item'/>
                                </div>
                            </CarouselItem>
                        ))}
                    </Carousel>
                    <div className='favorites-carousel-navigation'>
                        {this.state.items.map((item, index) => (
                            <span key={index} style={{cursor: 'pointer'}} onClick={this.setIndex.bind(this, index)}>
                                {this.state.index === index ? '\u25CF' : '\u25CB'}
                            </span>
                        ))}
                    </div>
                </div>
                <div className='description-container'>
                    <div className='property-description'>
                        <div
                            className='detail-description'><span
                            className='details-bold'>Street:</span> {this.props.house.street} {this.props.house.street_number}
                        </div>
                        <div
                            className='detail-description'><span
                            className='details-bold'>City:</span> {this.props.house.city} {this.props.house.post_number}
                        </div>
                        <div className='detail-description'><span
                            className='details-bold'>Canton:</span> {CANTONS[this.props.house.canton]}</div>
                        <div className='detail-description'><span
                            className='details-bold'>Sqm:</span> {this.props.house.sqm}</div>
                        <div className='detail-description'><span
                            className='details-bold'>Rooms:</span> {this.props.house.rooms}</div>
                        <div className='detail-description'><span
                            className='details-bold'>Bathroom:</span> {this.props.house.bathroom}</div>
                        <div className='detail-description'><span
                            className='details-bold'>Pets:</span> {this.props.house.pets ? 'Yes' : 'No'}</div>
                        <div
                            className='detail-description'><span
                            className='details-bold'>Balcony/terrace:</span> {this.props.house.balcony ? 'Yes' : 'No'}
                        </div>
                        <div className='detail-description'><span
                            className='details-bold'>Rental period:</span> {RENTAL_RANGE[this.props.house.rental_period]}
                        </div>
                        <div className='detail-description'><span
                            className='details-bold'>Property type:</span> {this.props.house.housing_type}</div>
                        <div className='detail-description'><span
                            className='details-bold'>Guests allowed:</span> {this.props.house.guests_allowed ? 'Yes' : 'No'}
                        </div>
                        <div className='detail-description'><span
                            className='details-bold'>Somking allowed:</span> {this.props.house.smoking ? 'Yes' : 'No'}
                        </div>
                    </div>
                    <div className='owner-description'>
                        <div
                            className='detail-description'><span
                            className='details-bold'>Name:</span> {this.props.owner.first_name} {this.props.owner.last_name}
                        </div>
                        <div
                            className='detail-description'><span
                            className='details-bold'>Age/sex:</span> {this.props.owner.profile.gender} {this.props.owner.gender}
                        </div>
                        <div className='detail-description'><span
                            className='details-bold'>About:</span> {this.props.owner.profile.about}</div>
                    </div>
                </div>
                <div className='buttons-container'>
                    <Button className='buttons' onClick={this.handleRemoveFavoriteClick}>Remove from Fav</Button>
                    <Button className='buttons' onClick={this.handleSendMsgToOwner}>Send message</Button>
                </div>
            </Page>
        )
    }
}


const mapStateToProps = (state, props) => {

    let houses = state.currentUser.favorites;

    const house = houses.filter(item => {
        return (item.id === props.houseId)
    })[0]
    const favorites = state.currentUser.favorites;
    return {
        favorites,
        house,
        owner: house.user
    };
};

export default connect(mapStateToProps)(FavoritesPropertyDisplay);
