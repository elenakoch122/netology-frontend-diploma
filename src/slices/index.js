import {configureStore} from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import stageReducer from './stageSlice';
import filterSlice from './filterSlice';
import routesSlice from './routesSlice';
import seatsSlice from './seatsSlice';
import passengersSlice from './passengersSlice';
import paySlice from './paySlice';
import orderSlice from './orderSlice';

export default configureStore({
    reducer: {
        search: searchReducer,
        stage: stageReducer,
        filter: filterSlice,
        routes: routesSlice,
        seats: seatsSlice,
        passengers: passengersSlice,
        pay: paySlice,
        order: orderSlice,
    },
});
