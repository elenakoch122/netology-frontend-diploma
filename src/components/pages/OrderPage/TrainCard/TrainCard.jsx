import React from 'react';
import './TrainCard.css';
import moment from 'moment';
import {useNavigate} from 'react-router';
import {useDispatch} from "react-redux";

import trainLogo from '../../../../images/tickets/train-logo.svg';
import trainLogoSmall from '../../../../images/tickets/train-logo-small.svg';
import clock from '../../../../images/tickets/train-clock.svg';
import rub from '../../../../images/tickets/tickets-rub.svg';

import {
    defaultRouteSvg,
    routeSvg,
    departureSvg,
    arrivalSvg,
    wifi,
    express,
    food,
} from '../../../../images/svg';

import PriceFormat from '../../../PriceFormat/PriceFormat';
import Duration from './Duration';
import {trainAdd} from "../../../../slices/seatsSlice";

function TrainCard(route, type) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {train, option} = route;
    const {departure, arrival} = train;

    const handleClick = () => {
        if (option === 'verification') {
            navigate('/order/tickets/train');
            return;
        }

        dispatch(trainAdd(route));
        navigate('/order/tickets/seats');
    };

    return (
        <div className={`train-card order_train ${option || ''}`}>
            <div className="train_logo">
                <img
                    className="train_logo-icon"
                    src={
                        option === 'ticket_header-train' ? trainLogoSmall : trainLogo
                    }
                    alt="Train"
                />
                <div className="train_title">
                    <h4 className="train_name">{departure.train.name}</h4>
                    {train.default && (
                        <p className="train_title-route train_title-route--default">
                            {train.default}
                            {defaultRouteSvg}
                        </p>
                    )}
                    <p className="train_title-route">
                        {departure.from.city.name}
                        {routeSvg}
                    </p>
                    <p className="train_title-route ">{departure.to.city.name}</p>
                </div>
            </div>

            <div className="train_routes">
                {departure && type !== 'arrival' && (
                    <div className="route train_route">
                        <div className="route_info train_route-info">
                            <p className="route_time train_route-time">
                                {moment
                                    .unix(departure.from.datetime)
                                    .utc()
                                    .format('HH:mm')}
                            </p>
                            <p className="route_city train_route-city">
                                {departure.from.city.name}
                            </p>
                            <p className="route_station train_route-station">
                                {departure.from.railway_station_name} вокзал
                            </p>
                        </div>
                        <div className="route_duration train_route-duration">
                            {option !== 'ticket_header-train' && (
                                <p className="route_duration-time train_route-duration-time">
                                    {moment
                                        .unix(departure.duration)
                                        .utc()
                                        .format('HH:mm')}
                                </p>
                            )}
                            {departureSvg}
                        </div>
                        <div className="route_info train_route-info">
                            <p className="route_time train_route-time">
                                {moment
                                    .unix(departure.to.datetime)
                                    .utc()
                                    .format('HH:mm')}
                            </p>
                            <p className="route_city train_route-city">
                                {departure.to.city.name}
                            </p>
                            <p className="route_station train_route-station">
                                {departure.to.railway_station_name} вокзал
                            </p>
                        </div>
                    </div>
                )}
                {arrival && type !== 'departure' && (
                    <div className="route train_route train_route--back">
                        <div className="route_info train_route-info">
                            <p className="route_time train_route-time">
                                {moment.unix(arrival.to.datetime).utc().format('HH:mm')}
                            </p>
                            <p className="route_city train_route-city">
                                {arrival.to.city.name}
                            </p>
                            <p className="route_station train_route-station">
                                {arrival.to.railway_station_name} вокзал
                            </p>
                        </div>
                        <div className="route_duration train_route-duration train_route-duration">
                            {option !== 'ticket_header-train' && (
                                <p className="route_duration-time train_route-duration-time">
                                    {moment.unix(arrival.duration).utc().format('HH:mm')}
                                </p>
                            )}
                            {arrivalSvg}
                        </div>
                        <div className="route_info train_route-info">
                            <p className="route_time train_route-time">
                                {moment
                                    .unix(arrival.from.datetime)
                                    .utc()
                                    .format('HH:mm')}
                            </p>
                            <p className="route_city train_route-city">
                                {arrival.from.city.name}
                            </p>
                            <p className="route_station train_route-station">
                                {arrival.from.railway_station_name} вокзал
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className="train_info">
                {option !== 'ticket_header-train' && (
                    <>
                        <ul className="train_seats-list">
                            {departure.available_seats_info.fourth && (
                                <li className="train_seats-item">
                                    <p className="train_seats-type">Сидячий</p>
                                    <p className="train_seats-count">
                                        {departure.available_seats_info.fourth}
                                    </p>
                                    <span className="train_seats-price">
                              от
                              <PriceFormat
                                  title="train_seats-price"
                                  value={departure.price_info.fourth.top_price}
                              />{' '}
                                        <img
                                            className="train_seats-price-currency"
                                            src={rub}
                                            alt="rub"
                                        />
                           </span>
                                </li>
                            )}
                            {departure.available_seats_info.third && (
                                <li className="train_seats-item">
                                    <p className="train_seats-type">Плацкарт</p>
                                    <p className="train_seats-count">
                                        {departure.available_seats_info.third}
                                    </p>
                                    <span className="train_seats-price">
                              от
                              <PriceFormat
                                  title="train_seats-price"
                                  value={departure.price_info.third.side_price}
                              />
                              <img
                                  className="train_seats-price-currency"
                                  src={rub}
                                  alt="rub"
                              />
                           </span>
                                </li>
                            )}
                            {departure.available_seats_info.second && (
                                <li className="train_seats-item">
                                    <p className="train_seats-type">Купе</p>
                                    <p className="train_seats-count">
                                        {departure.available_seats_info.second}
                                    </p>
                                    <span className="train_seats-price">
                              от
                              <PriceFormat
                                  title="train_seats-price"
                                  value={
                                      departure.price_info.second.bottom_price
                                  }
                              />
                              <img
                                  className="train_seats-price-currency"
                                  src={rub}
                                  alt="rub"
                              />
                           </span>
                                </li>
                            )}
                            {departure.available_seats_info.first && (
                                <li className="train_seats-item">
                                    <p className="train_seats-type">Люкс</p>
                                    <p className="train_seats-count">
                                        {departure.available_seats_info.first}
                                    </p>
                                    <span className="train_seats-price">
                              от
                              <PriceFormat
                                  title="train_seats-price"
                                  value={departure.price_info.first.top_price}
                              />
                              <img
                                  className="train_seats-price-currency"
                                  src={rub}
                                  alt="rub"
                              />
                           </span>
                                </li>
                            )}
                        </ul>
                        <div className="train_options">
                            {departure.have_wifi && wifi('train_options-icon')}
                            {departure.is_express && express('train_options-icon')}
                            {food('train_options-icon')}
                        </div>
                        <button
                            type="button"
                            className={`button ${
                                option === 'verification'
                                    ? 'verification_button'
                                    : 'train_seats-button'
                            }`}
                            onClick={handleClick}
                        >
                            {option === 'verification' ? 'Изменить' : 'Выбрать места'}
                        </button>
                    </>
                )}
                {option === 'ticket_header-train' && (
                    <div className="train_time">
                        <img className="train_icon-clock" src={clock} alt="clock"/>
                        <Duration
                            hours={moment.unix(departure.duration).utc().format('H')}
                            minutes={moment.unix(departure.duration).utc().format('m')}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default TrainCard;
