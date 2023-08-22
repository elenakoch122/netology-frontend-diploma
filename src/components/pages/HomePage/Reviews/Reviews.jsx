import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './Reviews.css';

import Review from './Review';
import FirstPhoto from '../../../../images/photos/review-first_photo.png';
import SecondPhoto from '../../../../images/photos/review-second_photo.png';

export default function Reviews() {
  return (
    <section id="reviews">
      <h2 className='reviews__title'>Отзывы</h2>

      <Carousel
        infiniteLoop
        showStatus={false}
        showArrows={false}
        showThumbs={false}
      >
        <div className='reviews'>
          <Review image={FirstPhoto} name="Екатерина Вальнова" text="Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые." />

          <Review image={SecondPhoto} name="Евгений Стрыкало" text="СМС-сопровождение до посадки Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке." />
        </div>

        <div className='reviews'>
          <Review image={FirstPhoto} name="Екатерина Вальнова" text="Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые." />

          <Review image={SecondPhoto} name="Евгений Стрыкало" text="СМС-сопровождение до посадки Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке." />
        </div>

        <div className='reviews'>
          <Review image={FirstPhoto} name="Екатерина Вальнова" text="Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые." />

          <Review image={SecondPhoto} name="Евгений Стрыкало" text="СМС-сопровождение до посадки Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке." />
        </div>
      </Carousel>
    </section>
  );
}