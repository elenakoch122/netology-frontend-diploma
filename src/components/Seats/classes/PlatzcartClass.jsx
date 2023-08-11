/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import Seat from '../seats/Seat';

export default function PlatzcartClass({ id, seatsList, typeTicket }) {
   const seats = [
      { number: 1, type: 'top', left: '133' },
      { number: 2, type: 'top', left: '133' },
      { number: 3, type: 'top', left: '194' },
      { number: 4, type: 'top', left: '194' },
      { number: 5, type: 'top', left: '223' },
      { number: 6, type: 'top', left: '223' },
      { number: 7, type: 'top', left: '283' },
      { number: 8, type: 'top', left: '283' },
      { number: 9, type: 'top', left: '312' },
      { number: 10, type: 'top', left: '312' },
      { number: 11, type: 'top', left: '373' },
      { number: 12, type: 'top', left: '373' },
      { number: 13, type: 'top', left: '402' },
      { number: 14, type: 'top', left: '402' },
      { number: 15, type: 'top', left: '462' },
      { number: 16, type: 'top', left: '462' },
      { number: 17, type: 'top', left: '491' },
      { number: 18, type: 'top', left: '491' },
      { number: 19, type: 'top', left: '551' },
      { number: 20, type: 'top', left: '551' },
      { number: 21, type: 'top', left: '580' },
      { number: 22, type: 'top', left: '580' },
      { number: 23, type: 'top', left: '641' },
      { number: 24, type: 'top', left: '641' },
      { number: 25, type: 'top', left: '670' },
      { number: 26, type: 'top', left: '670' },
      { number: 27, type: 'top', left: '731' },
      { number: 28, type: 'top', left: '731' },
      { number: 29, type: 'top', left: '760' },
      { number: 30, type: 'top', left: '760' },
      { number: 31, type: 'top', left: '820' },
      { number: 32, type: 'top', left: '820' },
      { number: 33, type: 'bottom', left: '133' },
      { number: 34, type: 'bottom', left: '177' },
      { number: 35, type: 'bottom', left: '222' },
      { number: 36, type: 'bottom', left: '266' },
      { number: 37, type: 'bottom', left: '312' },
      { number: 38, type: 'bottom', left: '356' },
      { number: 39, type: 'bottom', left: '402' },
      { number: 40, type: 'bottom', left: '446' },
      { number: 41, type: 'bottom', left: '491' },
      { number: 42, type: 'bottom', left: '535' },
      { number: 43, type: 'bottom', left: '580' },
      { number: 44, type: 'bottom', left: '624' },
      { number: 45, type: 'bottom', left: '670' },
      { number: 46, type: 'bottom', left: '714' },
      { number: 47, type: 'bottom', left: '759' },
      { number: 48, type: 'bottom', left: '803' },
   ];

   return (
       <div className="coach-seats-list coach-seats-list--platzcart">
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

PlatzcartClass.propTypes = {
   typeTicket: PropTypes.string.isRequired,
   id: PropTypes.number.isRequired,
   seatsList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
