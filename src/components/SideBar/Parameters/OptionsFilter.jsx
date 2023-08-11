import React from 'react';
import {nanoid} from 'nanoid';
import Options from './ОptionsFilterОption';

import firstClass from '../../../images/sideBar/firstClass.svg';
import secondClass from '../../../images/sideBar/secondClass.svg';
import thirdClass from '../../../images/sideBar/thirdClass.svg';
import fourthClass from '../../../images/sideBar/fourthClass.svg';
import wifi from '../../../images/sideBar/wifi.svg';
import express from '../../../images/sideBar/express.svg';

function OptionsFilter() {
    return (
        <div className="optionsFilter">
            <ul className="options-filter__list">
                <Options
                    key={nanoid()}
                    name="have_second_class"
                    alt="Купе"
                    src={secondClass}
                />
                <Options
                    key={nanoid()}
                    name="have_third_class"
                    alt="Плацкарт"
                    src={thirdClass}
                />
                <Options
                    key={nanoid()}
                    name="have_fourth_class"
                    alt="Сидячий"
                    src={fourthClass}
                />
                <Options
                    key={nanoid()}
                    name="have_first_class"
                    alt="Люкс"
                    src={firstClass}
                />
                <Options key={nanoid()} name="have_wifi" alt="Wi-Fi" src={wifi}/>
                <Options
                    key={nanoid()}
                    name="have_express"
                    alt="Экспресс"
                    src={express}
                />
            </ul>
        </div>
    );
}

export default OptionsFilter;
