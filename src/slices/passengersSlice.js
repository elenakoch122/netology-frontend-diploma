/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    passengersCount: JSON.parse(localStorage.getItem('passengersCount')) || {
        adult: 0,
        child: 0,
        baby: 0,
    },
    passengersPrice: JSON.parse(localStorage.getItem('passengersPrice')) || {
        departure: {
            adult: 0,
            child: 0,
            services: 0,
        },
        arrival: {
            adult: 0,
            child: 0,
            services: 0,
        },
    },
    passengers: JSON.parse(localStorage.getItem('passengers')) || [],
};

const passengersSlice = createSlice({
    name: 'passengers',
    initialState,
    reducers: {
        passengersCountChange: (state, action) => {
            const {type, count} = action.payload;
            state.passengersCount[type] = count;
            localStorage.setItem(
                'passengersCount',
                JSON.stringify(state.passengersCount)
            );
        },
        passengersPriceChange: (state, action) => {
            const {type, price, typeTicket} = action.payload;
            state.passengersPrice[typeTicket][type] = price;
            localStorage.setItem(
                'passengersPrice',
                JSON.stringify(state.passengersPrice)
            );
        },
        passengersPriceClear: (state) => {
            state.passengersPrice = {
                departure: {
                    adult: 0,
                    child: 0,
                    services: 0,
                },
                arrival: {
                    adult: 0,
                    child: 0,
                    services: 0,
                },
            };
        },

        addPassengersData: (state, action) => {
            const {number, data} = action.payload;
            if (state.passengers.filter((el) => el.number === number).length > 0) {
                state.passengers = state.passengers.map((el) =>
                    el.number === number ? data : el
                );
                localStorage.setItem(
                    'passengers',
                    JSON.stringify(state.passengers)
                );
            } else {
                state.passengers.push(data);
            }
            localStorage.setItem('passengers', JSON.stringify(state.passengers));
        },
        clearPassengersData: (state) => {
            state.passengers = [];
            localStorage.setItem('passengers', JSON.stringify([]));
        },
    },
});

export const {
    passengersCountChange,
    passengersPriceChange,
    passengersPriceClear,
    addPassengersData,
    clearPassengersData,
} = passengersSlice.actions;
export default passengersSlice.reducer;
