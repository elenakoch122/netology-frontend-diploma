/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    payer: JSON.parse(localStorage.getItem('payer')) || null,
};

const paySlice = createSlice({
    name: 'pay',
    initialState,
    reducers: {
        addPayerData: (state, action) => {
            const {data} = action.payload;
            state.payer = data;
            localStorage.setItem('payer', JSON.stringify(data));
        },
    },
});

export const {addPayerData} = paySlice.actions;
export default paySlice.reducer;
