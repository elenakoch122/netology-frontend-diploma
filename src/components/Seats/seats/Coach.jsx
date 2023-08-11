/* eslint-disable no-underscore-dangle */

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import PropTypes from 'prop-types';
import './Coach.css';
import rub from '../../../images/tickets/tickets-rub.svg';
import LuxClass from '../classes/LuxClass';
import KupeClass from '../classes/KupeClass';
import PlatzcartClass from '../classes/PlatzcartClass';
import SeatsClass from '../classes/SeatsClass';
import PriceFormat from '../../PriceFormat/PriceFormat';
import Service from './Service';
import {passengersPriceChange} from "../../../slices/passengersSlice";

export default function Coach({coach, seatsList, typeTicket}) {
    const {seats, services} = useSelector((state) => state.seats[typeTicket]);
    const {passengersCount} = useSelector((state) => state.passengers);
    const passengersPrice = useSelector(
        (state) => state.passengers.passengersPrice[typeTicket]
    );
    const dispatch = useDispatch();

    const type = {
        lux: coach.class_type === 'first',
        kupe: coach.class_type === 'second',
        platzcart: coach.class_type === 'third',
        seat: coach.class_type === 'fourth',
    };

    const [adult, setAdult] = useState(0);
    const [child, setChild] = useState(0);
    const [service, setService] = useState(0);

    useEffect(() => {
        const calculatePrice = (el) => {
            if (type.kupe || type.platzcart) {
                if (el > 32) {
                    return coach.side_price;
                }
                if (el % 2 === 0) {
                    return coach.top_price;
                }
                return coach.bottom_price;
            }
            if (type.seat) {
                if (el > 32) {
                    return coach.bottom_price;
                }
                return coach.top_price;
            }
            return coach.bottom_price;
        };

        if (seats[coach._id]) {
            const childPrice = seats[coach._id]
                .slice(0, passengersCount.child)
                .map((el) => calculatePrice(el) * 0.5)
                .reduce((acc, el) => acc + el, 0);
            const adultPrice = seats[coach._id]
                .slice(passengersCount.child)
                .map((el) => calculatePrice(el))
                .reduce((acc, el) => acc + el, 0);
            if (childPrice !== passengersPrice.child) {
                const previous = passengersPrice.child - child;
                setChild(Math.floor(childPrice));
                dispatch(
                    passengersPriceChange({
                        type: 'child',
                        price: previous + Math.floor(childPrice),
                        typeTicket,
                    })
                );
            }
            if (adultPrice !== passengersPrice.adult) {
                const previous = passengersPrice.adult - adult;
                setAdult(Math.floor(adultPrice));
                dispatch(
                    passengersPriceChange({
                        type: 'adult',
                        price: previous + Math.floor(adultPrice),
                        typeTicket,
                    })
                );
            }
        }
    }, [
        seats, adult, child, coach._id, dispatch, passengersCount.child, passengersPrice.adult, passengersPrice.child,
        typeTicket, coach.bottom_price, coach.side_price, coach.top_price, type.kupe, type.platzcart, type.seat
    ]);

    useEffect(() => {
        if (services[coach._id]) {
            const servicesPrice = services[coach._id]
                .map((el) => {
                    if (coach[`${el}_price`]) {
                        return coach[`${el}_price`];
                    }
                    return 0;
                })
                .reduce((acc, el) => acc + el, 0);
            if (servicesPrice !== passengersPrice.services) {
                const previous = passengersPrice.services - service;
                setService(Math.floor(servicesPrice));
                dispatch(
                    passengersPriceChange({
                        id: coach._id,
                        type: 'services',
                        price: previous + Math.floor(servicesPrice),
                        typeTicket,
                    })
                );
            }
        }
    }, [services, coach, dispatch, passengersPrice.services, service, typeTicket]);

    return (
        <div className="coach">
            <div className="coach-info">
                <div className="coach-info-header">
                    <p className="coach-number">{coach._id.toString().slice(-2)}</p>
                    <p className="coach-title">вагон</p>
                </div>
                <div className="coach-info-card coach-info-card--seats">
                    <h5 className="coach-info-title">
                        Места{' '}
                        <span className="coach-info-count">
                     {coach.available_seats}
                  </span>
                    </h5>
                    {!type.lux && (
                        <>
                            <p className="coach-info-text">
                                Верхние{' '}
                                <strong>
                                    {type.kupe &&
                                    seatsList.filter((el) => el.index % 2 === 0)
                                        .length}
                                    {type.platzcart &&
                                    seatsList.filter(
                                        (el) => el.index % 2 === 0 && el.index < 33
                                    ).length}
                                    {type.seat &&
                                    (seatsList.length < 32 ? seatsList.length : 32)}
                                </strong>
                            </p>
                            <p className="coach-info-text">
                                Нижние{' '}
                                <strong>
                                    {type.kupe &&
                                    seatsList.filter((el) => el.index % 2 !== 0)
                                        .length}
                                    {type.platzcart &&
                                    seatsList.filter(
                                        (el) => el.index % 2 !== 0 && el.index < 33
                                    ).length}
                                    {type.seat && seatsList.length - 32}
                                </strong>
                            </p>
                        </>
                    )}
                    {type.platzcart && (
                        <p className="coach-info-text">
                            Боковые{' '}
                            <strong>
                                {seatsList.filter((el) => el.index > 32).length}
                            </strong>
                        </p>
                    )}
                </div>
                <div className="coach-info-card coach-info-card--price">
                    <h5 className="coach-info-title">Стоимость</h5>
                    {!type.lux && (
                        <p className="coach-info-text">
                            <PriceFormat title="coach-info" value={coach.top_price}/>
                            <img
                                className="coach-ticket-сurrency"
                                src={rub}
                                alt="руб."
                            />
                        </p>
                    )}
                    <p className="coach-info-text">
                        <PriceFormat title="coach-info" value={coach.bottom_price}/>
                        <img className="coach-ticket-сurrency" src={rub} alt="руб."/>
                    </p>
                    {type.platzcart && (
                        <p className="coach-info-text">
                            <PriceFormat title="coach-info" value={coach.side_price}/>
                            <img
                                className="coach-ticket-сurrency"
                                src={rub}
                                alt="руб."
                            />
                        </p>
                    )}
                </div>

                <div className="coach-info-card coach-info-card--services">
                    <h5 className="coach-info-title">Обслуживание ФПК</h5>
                    <div className="coach-services">
                        {coach.have_air_conditioning && (
                            <Service service="air" id={coach._id} type={typeTicket}/>
                        )}
                        {coach.have_wifi && (
                            <Service service="wifi" id={coach._id} type={typeTicket}/>
                        )}
                        {coach.linens_price !== 0 && (
                            <Service
                                service="linens"
                                id={coach._id}
                                disabled={coach.is_linens_included}
                                type={typeTicket}
                            />
                        )}
                        <Service service="food" id={coach._id} type={typeTicket}/>
                    </div>
                </div>
            </div>
            <div className="coach-inner">
                <div className="coach-demand">
                    {seatsList.filter((el) => el.available === false).length} человек
                    выбирают места в этом поезде
                </div>
                {type.lux && (
                    <LuxClass
                        id={coach._id}
                        seatsList={seatsList}
                        typeTicket={typeTicket}
                    />
                )}
                {type.kupe && (
                    <KupeClass
                        id={coach._id}
                        seatsList={seatsList}
                        typeTicket={typeTicket}
                    />
                )}
                {type.platzcart && (
                    <PlatzcartClass
                        id={coach._id}
                        seatsList={seatsList}
                        typeTicket={typeTicket}
                    />
                )}
                {type.seat && (
                    <SeatsClass
                        id={coach._id}
                        seatsList={seatsList}
                        typeTicket={typeTicket}
                    />
                )}
            </div>
            <div className="coach-total">
                {child + adult + service > 0 && (
                    <p className="coach-total-text">
                        <PriceFormat
                            title="coach-total"
                            value={child + adult + service}
                        />
                        <img className="coach-total-сurrency" src={rub} alt="руб."/>
                    </p>
                )}
            </div>
        </div>
    );
}

Coach.propTypes = {
    coach: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
    ).isRequired,
    seatsList: PropTypes.string.isRequired,
    typeTicket: PropTypes.string.isRequired,
};
