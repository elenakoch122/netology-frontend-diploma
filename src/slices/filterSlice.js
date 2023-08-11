/* eslint-disable no-param-reassign */

import {createSlice} from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('filter')) || {
    have_first_class: false,
    have_second_class: true,
    have_third_class: true,
    have_fourth_class: false,
    have_wifi: true,
    have_express: false,
    have_air_conditioning: false,

    price_from: 10,
    price_to: 5210,

    start_departure_hour_from: 0,
    start_departure_hour_to: 24,

    start_arrival_hour_from: 0,
    start_arrival_hour_to: 24,

    end_departure_hour_from: 0,
    end_departure_hour_to: 24,

    end_arrival_hour_from: 0,
    end_arrival_hour_to: 24,

    limit: 5,
    offset: 0,
    sort: 'date',
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterChange: (state, action) => {
            const {name, value} = action.payload;
            state[name] = value;
        },
    },
});

export const {filterChange, cityExchange} = filterSlice.actions;
export default filterSlice.reducer;
