import React from 'react';
import { Link } from 'react-router-dom';
import './HowItWorks.css';

import HowItWorksElement from './HowItWorksElement';
import Directions from '../../../../images/icons/a-lot-of-directions_icon.png';
import Orders from '../../../../images/icons/comfortable-order_icon.png';
import Office from '../../../../images/icons/out-of-office_icon.png';

export default function HowItWorks() {
  return (
    <section className='how-it-works' id='how-it-works'>
      <div className="wrapper">
        <div className="how-it-works__wrapper">
          <h2 className='how-it-works__title'>Как это работает</h2>
          <Link className='how-it-works__learn-more'>Узнать больше</Link>
        </div>

        <div className='how-it-works__elements'>
          <HowItWorksElement image={Orders} text='Удобный заказ на сайте' />
          <HowItWorksElement image={Office} text='Нет необходимости ехать в офис' />
          <HowItWorksElement image={Directions} text='Огромный выбор направлений' />
        </div>
      </div>
    </section>
  );
}