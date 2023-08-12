/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    date_start: null,
    date_end: null,
    routeFrom: {
        id: '641037eb5c49ea004632ee6e',
        city: 'москва',
    },
    routeIn: {
        id: '641037eb5c49ea004632ee6f',
        city: 'санкт-петербург',
    },
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchFieldChange: (state, action) => {
            const {name, value} = action.payload;
            state[name] = value;
        },
        cityExchange: (state) => {
            const from = state.routeFrom;
            state.routeFrom = state.routeIn;
            state.routeIn = from;
        },
    },
});

export const {searchFieldChange, cityExchange} = searchSlice.actions;
export default searchSlice.reducer;
