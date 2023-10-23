/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Range, getTrackBackground } from "react-range";
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import style from './RangeSlider.module.css';
import { filterChange } from '../../../../slices/filterSlice';

export default function RangeSlider({ min, max, step, type, subtype }) {
  const [values, setValues] = useState([min, max]);
  const filter = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const onChange = (value, name) => {
    if (type === 'time') {
      dispatch(filterChange({ name: `${name}_hour_from`, value: value[0] }));
      dispatch(filterChange({ name: `${name}_hour_to`, value: value[1] }));
    }

    if (type === 'price') {
      dispatch(filterChange({ name: 'price_from', value: value[0] }));
      dispatch(filterChange({ name: 'price_to', value: value[1] }));
    }
    setValues(value);
  };

  return (
    <Range
      step={step}
      min={min}
      max={max}
      values={values}
      onChange={(newValues) => onChange(newValues, subtype)}

      renderTrack={({ props, children }) => (
        <div
          {...props}
          className={style.track}
          style={{
            background: getTrackBackground({
              values: type === 'price' ? [filter.price_from, filter.price_to] : [filter[`${subtype}_hour_from`], filter[`${subtype}_hour_to`]],
              colors: ['transparent', '#FFA800', 'transparent'],
              min,
              max,
            }),
          }}
        >
          {children}
        </div>
      )}

      renderThumb={({ props, index }) => (
        <div {...props} className={style.thumb}>
          <div className={style.caption}>
            {type !== 'time' ? values[index] : (
              values[index] !== 24 ? moment(values[index], 'h').format('HH:mm') : '24:00'
            )}
          </div>
        </div>
      )}
    />
  );
}

RangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  subtype: PropTypes.string,
};

RangeSlider.defaultProps = {
  subtype: ''
};