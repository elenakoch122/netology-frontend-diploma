import React from 'react';

import DateFilter from './DateFilter';
import OptionsFilter from './OptionsFilter';
import PriceFilter from './PriceFilter';
import TimeFilter from './TimeFilter';
import './Parameters.css';

export default function Parameters() {
  return (
    <div className="parameters">
      <DateFilter/>
      <OptionsFilter/>
      <PriceFilter/>
      <TimeFilter/>
    </div>
  );
}