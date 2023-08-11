/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import Seat from '../seats/Seat';

export default function LuxClass({ id, seatsList, typeTicket }) {
   const seats = [
      { number: 1, type: 'lux', left: '133' },
      { number: 3, type: 'lux', left: '194' },
      { number: 4, type: 'lux', left: '223' },
      { number: 5, type: 'lux', left: '283' },
      { number: 6, type: 'lux', left: '312' },
      { number: 7, type: 'lux', left: '373' },
      { number: 8, type: 'lux', left: '402' },
      { number: 9, type: 'lux', left: '462' },
      { number: 10, type: 'lux', left: '491' },
      { number: 11, type: 'lux', left: '551' },
      { number: 12, type: 'lux', left: '580' },
      { number: 13, type: 'lux', left: '641' },
      { number: 14, type: 'lux', left: '670' },
      { number: 15, type: 'lux', left: '731' },
      { number: 16, type: 'lux', left: '760' },
      { number: 18, type: 'lux', left: '820' },
   ];

   return (
       <div className="coach-seats-list coach-seats-list--lux">
          {seats.map((el) => (
              <Seat
                  id={id}
                  key={el.number}
                  typeTicket={typeTicket}
                  number={el.number}
                  type={el.type}
                  left={el.left}
                  available={
                     seatsList[el.number - 1]
                         ? seatsList[el.number - 1].available
                         : false
                  }
              />
          ))}
       </div>
   );
}

LuxClass.propTypes = {
   typeTicket: PropTypes.string.isRequired,
   id: PropTypes.number.isRequired,
   seatsList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
