import React from 'react';

import DateFilter from './DateFilter';
import OptionsFilter from './OptionsFilter';
import PriceFilter from './PriceFilter';
import TimeFilter from './TimeFilter';
import './Parameters.css';

function Parameters() {
    return (
        <aside className="parameters">
            <DateFilter/>
            <OptionsFilter/>
            <PriceFilter/>
            <TimeFilter/>
        </aside>
    );
}

export default Parameters;
