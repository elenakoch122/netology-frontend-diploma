/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    stage: 1,
};

const stageSlice = createSlice({
    name: 'stage',
    initialState,
    reducers: {
        stageChange: (state, action) => {
            const {stage} = action.payload;
            state.stage = stage;
        },
    },
});

export const {stageChange} = stageSlice.actions;
export default stageSlice.reducer;
