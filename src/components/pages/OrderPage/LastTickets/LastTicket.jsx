import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';

import rub from '../../../../images/tickets/tickets-rub.svg';
import express from '../../../../images/tickets/tickets-express.svg';
import wifi from '../../../../images/tickets/tickets-wifi.svg';
import conditioning from '../../../../images/tickets/tickets-conditioning.svg';
import food from '../../../../images/tickets/tickets-food.svg';

import { coachItemsClear, trainAdd } from '../../../../slices/seatsSlice';
import { passengersPriceClear } from '../../../../slices/passengersSlice';

export default function LastTicket({ ticket }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    dispatch(trainAdd({ train: ticket }));
    dispatch(coachItemsClear({ type: 'arrival' }));
    dispatch(coachItemsClear({ type: 'departure' }));
    dispatch(passengersPriceClear());
    navigate('/order/tickets/seats');
  };

  return (
    <div className="last_ticket" onClick={onClick}>
      <div className="last_ticket-header">
        <div className="last_ticket-title-from">
          <h4 className="last_ticket-title">{ticket.departure.from.city.name}</h4>

          <span className="last_ticket-subtitle">
            {ticket.departure.from.railway_station_name}<br />
            вокзал
          </span>
        </div>

        <div className="last_ticket-title-to">
          <h4 className="last_ticket-title">{ticket.departure.to.city.name}</h4>

          <span className="last_ticket-subtitle">
            {ticket.departure.to.railway_station_name}<br />
            вокзал
          </span>
        </div>
      </div>

      <div className="last_ticket-info">
        <div className="last_ticket-options">
          {ticket.departure.have_wifi && (
            <img
              className="last_ticket-options-icon"
              src={wifi}
              alt="wi-fi"
            />
          )}

          {ticket.departure.is_express && (
            <img
              className="last_ticket-options-icon"
              src={express}
              alt="express"
            />
          )}

          {ticket.departure.have_air_conditioning && (
            <img
              className="last_ticket-options-icon"
              src={conditioning}
              alt="conditioning"
            />
          )}

          <img
            className="last_ticket-options-icon"
            src={food}
            alt="food"
          />
        </div>

        <div className="last_ticket-price-range">
          <span className="last_ticket-price">
            от{' '}

            <span className="last_ticket-price-value currency-item">
              {ticket.departure.min_price.toLocaleString('ru')}
            </span>

            <img className="last_ticket__currency" src={rub} alt="руб." />
          </span>
        </div>
      </div>
    </div>
  );
}

LastTicket.propTypes = {
  ticket: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.object,
    ])
  ).isRequired,
};