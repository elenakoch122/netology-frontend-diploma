/* eslint-disable no-underscore-dangle */

import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";

import PropTypes from 'prop-types';
import { routeTo, routeBack, seat, platzcart, kupe, lux } from '../../../images/svg';

import './Ticket.css';
import Train from '../../pages/OrderPage/TrainCard/TrainCard';
import {coachClassChange, coachItemsClear, coachItemsSelect, coachItemsUnSelect} from "../../../slices/seatsSlice";
import {passengersCountChange} from "../../../slices/passengersSlice";
import Coach from "./Coach";

export default function Ticket({type}) {
    const {train} = useSelector((state) => state.seats.train);
    const {coachList, coachClass, coachItems} = useSelector(
        (state) => state.seats[type]
    );

    const {passengersCount} = useSelector((state) => state.passengers);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(coachItemsClear({type}));
    }, [dispatch, type]);

    const available = {
        adult: 4 - passengersCount.adult - passengersCount.child,
        child:
            passengersCount.adult === 0
                ? 3
                : 4 - passengersCount.adult - passengersCount.child,
        baby: passengersCount.adult,
    };

    const classes = {
        fourth: {
            available: train[type].have_fourth_class === true,
            icon: seat,
            name: 'Сидячий',
        },
        third: {
            available: train[type].have_third_class === true,
            icon: platzcart,
            name: 'Плацкарт',
        },
        second: {
            available: train[type].have_second_class === true,
            icon: kupe,
            name: 'Купе',
        },
        first: {
            available: train[type].have_first_class === true,
            icon: lux,
            name: 'Люкс',
        },
    };

    const handleChange = (name, value) => {
        if (available[name] + passengersCount[name] < value) return;
        if (name === 'baby' && available[name] < value) return;

        dispatch(passengersCountChange({type: name, count: Number(value)}));
    };

    const handleClick = (classType) => {
        dispatch(coachClassChange({coachClass: classType, type}));
        dispatch(coachItemsClear({type}));
    };

    const handleCoachClick = (id) => {
        if (coachItems.includes(id)) {
            dispatch(coachItemsUnSelect({id, type}));
        } else {
            dispatch(coachItemsSelect({id, type}));
        }
    };

    const handleBack = () => {
        dispatch(coachItemsClear({type}));
        navigate(-1);
    };

    return (
        <div className="ticket">
            <div className="ticket_header ticket_header--route--there">
                <div
                    className={`ticket_header-actions ${
                        type === 'departure' ? '' : 'routeBack'
                    }`}
                >
                    {type === 'departure' ? routeTo : routeBack}
                    <button
                        type="button"
                        className="button ticket_header-button"
                        onClick={handleBack}
                    >
                        Выбрать другой поезд
                    </button>
                </div>
                <Train train={train} type={type} option="ticket_header-train"/>
            </div>
            <section className="ticket_count">
                <h4 className="ticket_title ticket_count-title">
                    Количество билетов
                </h4>
                <div className="ticket_count-wrapper">
                    <div className="ticket_count-card ticket_count-card--adults">
                        <select
                            className="ticket_count-list"
                            name="adult"
                            value={passengersCount.adult}
                            onChange={(event) =>
                                handleChange(event.target.name, event.target.value)
                            }
                        >
                            {[0, 1, 2, 3, 4].map((el) => (
                                <option
                                    className="ticket_count-item"
                                    value={el}
                                    key={`adult${el}`}
                                >
                                    Взрослых — {el}
                                </option>
                            ))}
                        </select>
                        {available.adult > 0 && (
                            <p className="ticket_count-text">
                                Можно добавить еще {available.adult}{' '}
                                {available.adult > 1 ? 'пассажиров' : 'пассажира'}
                            </p>
                        )}
                    </div>
                    <div className="ticket_count-card ticket_count-card--children">
                        <select
                            className="ticket_count-list"
                            name="child"
                            value={passengersCount.child}
                            onChange={(event) =>
                                handleChange(event.target.name, event.target.value)
                            }
                        >
                            {[0, 1, 2, 3].map((el) => (
                                <option
                                    className="ticket_count-item"
                                    value={el}
                                    key={`child${el}`}
                                >
                                    Детских — {el}
                                </option>
                            ))}
                        </select>
                        {available.child > 0 && (
                            <p className="ticket_count-text count-child">
                                Можно добавить еще {available.child}{' '}
                                {available.child > 1 ? 'детей' : 'ребенка'} до 10
                                лет.Свое место в вагоне, как у взрослых, но дешевле в
                                среднем на 50-65%
                            </p>
                        )}
                    </div>
                    <div className="ticket_count-card">
                        <select
                            className="ticket_count-list"
                            name="baby"
                            value={passengersCount.baby}
                            onChange={(event) =>
                                handleChange(event.target.name, event.target.value)
                            }
                        >
                            {[0, 1, 2, 3, 4].map((el) => (
                                <option
                                    className="ticket_count-item"
                                    value={el}
                                    key={`baby${el}`}
                                >
                                    Детских «без места» — {el}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </section>
            <section className="ticket_class">
                <h4 className="ticket_title ticket_class-title">Тип вагона</h4>
                <ul className="ticket_class-list">
                    {Object.keys(classes).map((el) =>
                        classes[el].available ? (
                            <li className="ticket_class-item" key={el}>
                                <button
                                    type="button"
                                    className={`ticket_class-button ${
                                        coachClass === el
                                            ? 'ticket_class-button--active'
                                            : ''
                                    }`}
                                    disabled={!classes[el].available}
                                    onClick={() => handleClick(el)}
                                >
                                    {classes[el].icon}
                                    <p className="ticket_class-name">
                                        {classes[el].name}
                                    </p>
                                </button>
                            </li>
                        ) : (
                            ''
                        )
                    )}
                </ul>
            </section>
            {coachList.filter((el) => el.coach.class_type === coachClass).length >
                0 && (
                    <div className="ticket_coach">
                        <div className="ticket_coach-header">
                            <ul className="ticket_coach-list">
                                Вагоны
                                {coachList
                                    .filter((el) => el.coach.class_type === coachClass)
                                    .map((el) => (
                                        <li
                                            className={`ticket_coach-item ${
                                                coachItems.includes(el.coach._id)
                                                    ? 'ticket_coach-item--active'
                                                    : ''
                                            }`}
                                            key={el.coach._id}
                                            onClick={() => handleCoachClick(el.coach._id)}
                                        >
                                            {el.coach._id.toString().slice(-2)}
                                        </li>
                                    ))}
                            </ul>
                            <p className="ticket_coach-numbering">
                                Нумерация вагонов начинается с головы поезда
                            </p>
                        </div>
                        {coachList
                            .filter(
                                (el) =>
                                    el.coach.class_type === coachClass &&
                                    coachItems.includes(el.coach._id)
                            )
                            .map((el) => (
                                <Coach
                                    key={el.coach._id}
                                    coach={el.coach}
                                    seatsList={el.seats}
                                    typeTicket={type}
                                />
                            ))}
                    </div>
                )}
        </div>
    );
}

Ticket.propTypes = {
    type: PropTypes.string.isRequired,
};
