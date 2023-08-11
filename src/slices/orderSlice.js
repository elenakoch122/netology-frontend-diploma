/* eslint-disable no-loop-func */
/* eslint-disable guard-for-in */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchOrder = createAsyncThunk(
    'order/fetchOrder',
    async (_, {rejectWithValue, getState}) => {
        const {passengers, pay, seats} = getState();
        const {payer} = pay;
        const passengersDeparture = passengers.passengers.slice();
        const passengersArrival = passengers.passengers.slice();
        const seatsDeparture = seats.departure.seats;
        const seatsArrival = seats.arrival.seats;
        const seatsCountArrival = seats.arrival.seatsCount;
        let countBabyDeparture = 0;
        let countBabyArrival = 0;
        const {baby} = passengers.passengersCount;
        const departureArrSeats = [];
        const arrivalArrSeats = [];

        for (const key in seatsDeparture) {
            seatsDeparture[key].forEach((seat) => {
                const person = passengersDeparture.shift();
                let include_children = false;
                if (person.type === 'adult' && baby > countBabyDeparture) {
                    countBabyDeparture += 1;
                    include_children = true;
                }
                const obj = {
                    coach_id: key,
                    seat_number: seat,
                    person_info: {
                        is_adult: person.type === 'adult',
                        first_name: person.name,
                        last_name: person.surname,
                        patronymic: person.lastname,
                        gender: person.sex === 'male',
                        birthday: person.birth,
                        document_type:
                            person.series !== ''
                                ? 'паспорт'
                                : 'свидетельство о рождении',
                        document_data: `${person.series} ${person.document}`,
                    },
                    is_child: person.type === 'child',
                    include_children_seat: include_children,
                };
                departureArrSeats.push(obj);
            });
        }

        if (seatsCountArrival !== 0) {
            for (const key in seatsArrival) {
                seatsArrival[key].forEach((seat) => {
                    const person = passengersArrival.shift();
                    let include_children = false;
                    if (person.type === 'adult' && baby > countBabyArrival) {
                        countBabyArrival += 1;
                        include_children = true;
                    }
                    const obj = {
                        coach_id: key,
                        seat_number: seat,
                        person_info: {
                            is_adult: person.type === 'adult',
                            first_name: person.name,
                            last_name: person.surname,
                            patronymic: person.lastname,
                            gender: person.sex === 'male',
                            birthday: person.birth,
                            document_type:
                                person.series !== ''
                                    ? 'паспорт'
                                    : 'свидетельство о рождении',
                            document_data: `${person.series} ${person.document}`,
                        },
                        is_child: person.type === 'child',
                        include_children_seat: include_children,
                    };
                    arrivalArrSeats.push(obj);
                });
            }
        }

        const user = {
            first_name: payer.name,
            last_name: payer.surname,
            patronymic: payer.lastname,
            phone: payer.phone,
            email: payer.email,
            payment_method: payer.pay,
        };
        const departure = {
            route_direction_id: seats.train.train.departure._id,
            seats: departureArrSeats,
        };
        const arrival =
            seatsCountArrival !== 0
                ? {
                    route_direction_id: seats.train.train.arrival._id,
                    seats: arrivalArrSeats,
                }
                : {};

        const data =
            seatsCountArrival === 0
                ? {user, departure}
                : {user, departure, arrival};

        const url = `${process.env.REACT_APP_URL}order`;

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            return rejectWithValue('Server Error');
        }
        return response.json();
    }
);

const initialState = {
    orderStatus: null,
    status: null,
    error: null,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearStatus: (state) => {
            state.status = null;
            state.orderStatus = null;
            state.error = null;
        },
    },
    extraReducers: {
        [fetchOrder.pending]: (state) => {
            state.status = 'panding';
            state.orderStatus = null;
            state.error = null;
        },
        [fetchOrder.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.orderStatus = action.payload.status;
        },
        [fetchOrder.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
    },
});

export const {clearStatus} = orderSlice.actions;
export default orderSlice.reducer;
