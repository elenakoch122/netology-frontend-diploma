import React from 'react';
import PropTypes from 'prop-types';

import PriceFormat from '../../../PriceFormat/PriceFormat';
import rub from '../../../../images/tickets/tickets-rub.svg';
import express from '../../../../images/tickets/tickets-express.svg';
import wifi from '../../../../images/tickets/tickets-wifi.svg';
import conditioning from '../../../../images/tickets/tickets-conditioning.svg';
import food from '../../../../images/tickets/tickets-food.svg';

function LastTicket({ticket}) {
    return (
        <div className="last_ticket">
            <div className="last_ticket-header">
                <div className="last_ticket-title-from">
                    <h4 className="last_ticket-title">
                        {ticket.departure.from.city.name}
                    </h4>
                    <span className="last_ticket-subtitle">
                  {ticket.departure.from.railway_station_name}
                        <br/>
                  вокзал
               </span>
                </div>
                <div className="last_ticket-title-to">
                    <h4 className="last_ticket-title">
                        {ticket.departure.to.city.name}
                    </h4>
                    <span className="last_ticket-subtitle">
                  {ticket.departure.to.railway_station_name}
                        <br/>
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
                   <PriceFormat
                       title="last_ticket-price"
                       value={ticket.departure.min_price}
                   />
                  <img className="last_ticket__currency" src={rub} alt="руб."/>
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

export default LastTicket;
