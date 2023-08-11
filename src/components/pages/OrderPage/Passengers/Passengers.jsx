import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {nanoid} from 'nanoid';

import './Passengers.css';

import {stageChange} from '../../../../slices/stageSlice';
import PassengerForm from '../PassengerForm/PassengerForm';
import {clearPassengersData} from '../../../../slices/passengersSlice';

function Passengers() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {passengersCount} = useSelector((state) => state.passengers);
    const passengersCountTotal =
        passengersCount.adult + passengersCount.child + passengersCount.baby;
    const {passengers} = useSelector((state) => state.passengers);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        dispatch(stageChange({stage: 2}));
        if (passengersCountTotal < passengers.length) {
            dispatch(clearPassengersData());
        }
    }, [dispatch, passengers.length, passengersCountTotal]);

    useEffect(() => {
        setDisabled(true);
        if (passengers.length !== passengersCountTotal) return;
        setDisabled(false);
    }, [passengersCount, passengers, passengersCountTotal]);

    const handleClick = () => {
        navigate('/order/pay/');
        document.documentElement.scrollTop = 0;
    };

    return (
        <section className="passengers order_passengers">
            {[...Array(passengersCount.adult)].map((e, i) => (
                <PassengerForm type="adult" number={i + 1} key={nanoid()}/>
            ))}
            {[...Array(passengersCount.child + passengersCount.baby)].map(
                (e, i) => (
                    <PassengerForm
                        type="child"
                        number={i + 1 + passengersCount.adult}
                        key={nanoid()}
                    />
                )
            )}
            <div className="passengers_buttons">
                <button
                    type="button"
                    className="button passengers_button"
                    onClick={handleClick}
                    disabled={disabled}
                >
                    Далее
                </button>
            </div>
        </section>
    );
}

export default Passengers;
