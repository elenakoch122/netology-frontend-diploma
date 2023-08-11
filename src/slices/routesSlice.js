/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchRoutes = createAsyncThunk(
    'routes/fetchRoutes',
    async (_, {rejectWithValue, getState}) => {
        const {filter} = getState();
        const from_city_id = getState().search.routeFrom.id;
        const to_city_id = getState().search.routeIn.id;

        let url = `${process.env.REACT_APP_URL}routes?from_city_id=${from_city_id}&to_city_id=${to_city_id}`;
        const {date_start, date_end} = getState().search;

        if (date_start) {
            url += `&date_start=${date_start}`;
        }
        if (date_end) {
            url += `&date_end=${date_end}`;
        }
        let options = '';

        for (const key in filter) {
            if (filter[key] || filter[key] === 0) {
                options += `&${key}=${filter[key]}`;
            }
        }
        url += options;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                return rejectWithValue('Server Error');
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    routes: [],
    status: null,
    error: null,
    total_count: 0,
};
const routesSlice = createSlice({
    name: 'routes',
    initialState,
    reducers: {
        routesPush: (state, action) => {
            state.routes = action.payload;
        },
        routesClear: (state) => {
            state.routes.length = 0;
        },
    },
    extraReducers: {
        [fetchRoutes.pending]: (state) => {
            state.status = 'panding';
            state.error = null;
        },
        [fetchRoutes.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.routes = action.payload.items;
            state.total_count = action.payload.total_count;
        },
        [fetchRoutes.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
    },
});

export const {routesPush, routesClear, trainAdd, trainClear} =
    routesSlice.actions;
export default routesSlice.reducer;
