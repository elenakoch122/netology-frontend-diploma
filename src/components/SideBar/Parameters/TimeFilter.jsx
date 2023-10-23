/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import RangeSlider from './RangeSlider/RangeSlider';

export default function TimeFilter() {
  const { date_end } = useSelector((state) => state.search);

  const [isHidden, setHidden] = useState({
    departure: true,
    arrival: true,
  });

  const onHidden = (name) => {
    setHidden((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <>
      <div className="time-filter">
        <div className="time-filter__header">
          <h4 className="time-filter__header-title title title-go-there">Туда</h4>

          <button
            type="button"
            className={`time-filter__button ${isHidden.departure ? 'active-button' : 'inactive-button'
              }`}
            onClick={() => onHidden('departure')}
          />
        </div>

        <div className={`time-filter__form ${isHidden.departure ? 'hidden' : ''}`}>
          <p className="time-filter__title">Время отбытия</p>
          <div className="time-filter__range">
            <RangeSlider min={0} max={24} step={1} type='time' subtype='start_departure' />
          </div>

          <p className="time-filter__title title title-right">Время прибытия</p>
          <div className="time-filter__range">
            <RangeSlider min={0} max={24} step={1} type='time' subtype='start_arrival' />
          </div>
        </div>
      </div>

      <div className="time-filter">
        <div className={`timeFilter_inner ${date_end ? '' : 'hidden'}`}>
          <div className="time-filter__header">
            <h4 className="time-filter__header-title title title-go-back">Обратно</h4>
            <button
              type="button"
              className={`time-filter__button ${isHidden.arrival ? 'active-button' : 'inactive-button'
                }`}
              onClick={() => onHidden('arrival')}
            />
          </div>

          <div className={`time-filter__form ${isHidden.arrival ? 'hidden' : ''}`}>
            <p className="time-filter__title title">Время отбытия</p>
            <div className="time-filter__range">
              <RangeSlider min={0} max={24} step={1} type='time' subtype='end_departure' />
            </div>

            <p className="time-filter__title title-right">Время прибытия</p>
            <div className="time-filter__range">
              <RangeSlider min={0} max={24} step={1} type='time' subtype='end_arrival' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}