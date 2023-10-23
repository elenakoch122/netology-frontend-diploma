import React from 'react';
import RangeSlider from './RangeSlider/RangeSlider';

export default function PriceFilter() {
  return (
    <div className="price-filter">
      <h4 className="price-filter__title" htmlFor="slider">Стоимость</h4>

      <div className="price-filter__label-wrapper">
        <span className="price-filter__label">от</span>
        <span className="price-filter__label">до</span>
      </div>

      <RangeSlider min={1920} max={7000} step={10} type='price' />
    </div>
  );
}