import React from 'react';
import PropTypes from 'prop-types';
import Seat from '../seats/Seat';

export default function SeatClass({ id, seatsList, typeTicket }) {
   const seats = [
      { number: 1, type: 'single', left: '143' },
      { number: 2, type: 'single', left: '143' },
      { number: 3, type: 'single', left: '190' },
      { number: 4, type: 'single', left: '190' },
      { number: 5, type: 'single', left: '233' },
      { number: 6, type: 'single', left: '233' },
      { number: 7, type: 'single', left: '275' },
      { number: 8, type: 'single', left: '275' },
      { number: 9, type: 'single', left: '320' },
      { number: 10, type: 'single', left: '320' },
      { number: 11, type: 'single', left: '365' },
      { number: 12, type: 'single', left: '365' },
      { number: 13, type: 'single', left: '409' },
      { number: 14, type: 'single', left: '409' },
      { number: 15, type: 'single', left: '452' },
      { number: 16, type: 'single', left: '452' },
      { number: 17, type: 'single', left: '497' },
      { number: 18, type: 'single', left: '497' },
      { number: 19, type: 'single', left: '541' },
      { number: 20, type: 'single', left: '541' },
      { number: 21, type: 'single', left: '584' },
      { number: 22, type: 'single', left: '584' },
      { number: 23, type: 'single', left: '630' },
      { number: 24, type: 'single', left: '630' },
      { number: 25, type: 'single', left: '672' },
      { number: 26, type: 'single', left: '672' },
      { number: 27, type: 'single', left: '718' },
      { number: 28, type: 'single', left: '718' },
      { number: 29, type: 'single', left: '760' },
      { number: 30, type: 'single', left: '760' },
      { number: 31, type: 'single', left: '805' },
      { number: 32, type: 'single', left: '805' },
      { number: 33, type: 'single', left: '143' },
      { number: 34, type: 'single', left: '190' },
      { number: 35, type: 'single', left: '190' },
      { number: 36, type: 'single', left: '233' },
      { number: 37, type: 'single', left: '233' },
      { number: 38, type: 'single', left: '275' },
      { number: 39, type: 'single', left: '275' },
      { number: 40, type: 'single', left: '320' },
      { number: 41, type: 'single', left: '320' },
      { number: 42, type: 'single', left: '365' },
      { number: 43, type: 'single', left: '365' },
      { number: 44, type: 'single', left: '409' },
      { number: 45, type: 'single', left: '409' },
      { number: 46, type: 'single', left: '452' },
      { number: 47, type: 'single', left: '452' },
      { number: 48, type: 'single', left: '497' },
      { number: 49, type: 'single', left: '497' },
      { number: 50, type: 'single', left: '541' },
      { number: 51, type: 'single', left: '541' },
      { number: 52, type: 'single', left: '584' },
      { number: 53, type: 'single', left: '584' },
      { number: 54, type: 'single', left: '630' },
      { number: 55, type: 'single', left: '630' },
      { number: 56, type: 'single', left: '672' },
      { number: 57, type: 'single', left: '672' },
      { number: 58, type: 'single', left: '718' },
      { number: 59, type: 'single', left: '718' },
      { number: 60, type: 'single', left: '760' },
      { number: 61, type: 'single', left: '760' },
      { number: 62, type: 'single', left: '805' },
   ];

   return (
      <div className="coach-seats-list coach-seats-list--seat">
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

SeatClass.propTypes = {
   typeTicket: PropTypes.string.isRequired,
   id: PropTypes.number.isRequired,
   seatsList: PropTypes.string.isRequired,
};
