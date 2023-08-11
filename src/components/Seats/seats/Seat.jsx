import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import PropTypes from 'prop-types';
import {seatsItemSelect, seatsItemUnSelect} from "../../../slices/seatsSlice";

export default function Seat({
                                 id,
                                 number,
                                 type,
                                 left,
                                 available,
                                 typeTicket,
                             }) {
    const {seats, seatsCount} = useSelector(
        (state) => state.seats[typeTicket]
    );
    const {passengersCount} = useSelector((state) => state.passengers);
    const dispatch = useDispatch();

    const style = {
        top: '0',
        left: `${left}px`,
    };

    if (type === 'top') {
        if (number % 2 === 0) {
            style.top = '30px';
        } else {
            style.top = '60px';
        }
    } else if (type === 'bottom') {
        style.top = '113px';
    } else if (type === 'lux') {
        style.top = '29px';
    } else if (number < 33) {
        if (number % 2 === 0) {
            style.top = '33px';
        } else {
            style.top = '54px';
        }
    } else if (number === 62 || number % 2 !== 0) {
        style.top = '113px';
    } else {
        style.top = '93px';
    }

    const handleClick = () => {
        if (seats[id] && seats[id].includes(number)) {
            dispatch(seatsItemUnSelect({id, number, type: typeTicket}));
        } else if (seatsCount < passengersCount.adult + passengersCount.child) {
            dispatch(seatsItemSelect({id, number, type: typeTicket}));
        }
    };

    return (
        <button
            type="button"
            className={`coach-seat coach-seat--${type} ${
                seats[id] && seats[id].includes(number) ? 'coach-seat--active' : ''
            }`}
            style={style}
            disabled={!available}
            onClick={handleClick}
        >
            <p className="coach-seat-number" id={number}>
                {number}
            </p>
        </button>
    );
}

Seat.propTypes = {
    id: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    left: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
    typeTicket: PropTypes.string.isRequired,
};
