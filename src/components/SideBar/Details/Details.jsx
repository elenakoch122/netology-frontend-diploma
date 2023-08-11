/* eslint-disable radix */

import React, { useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { departureSvg, arrivalSvg } from '../../../images/svg';
import rub from '../../../images/tickets/tickets-rub.svg';
import './Details.css';
import PriceFormat from "../../PriceFormat/PriceFormat";

export default function Details() {
   const { train } = useSelector((state) => state.seats.train);
   const { departure, arrival } = train;
   const { passengersCount, passengersPrice } = useSelector(
      (state) => state.passengers
   );
   const [isHidden, setHidden] = useState({
      departure: true,
      arrival: true,
      passengers: true,
   });
   const onHidden = (name) => {
      setHidden((prev) => ({ ...prev, [name]: !prev[name] }));
   };

   const formatSeconds = (value) => {
      const hour = parseInt(value / 3600);
      const min = parseInt((value % 3600) / 60);
      return `${hour} : ${min}`;
   };

   return (
      <section className="details">
         <h3 className="title details_title">Детали поездки</h3>
         <div className="sidebar_inner">
            <div className="sidebar_header title-go-there">
               <h4 className="title title--small sidebar_title">
                  Туда
                  <span className="sidebar_date">
                     {moment.unix(departure.from.datetime).format('DD.MM.YYYY')}
                  </span>
               </h4>
               <button
                  type="button"
                  className={`details_departure details_button ${
                     !isHidden.departure ? 'active-button' : 'inactive-button'
                  }`}
                  onClick={() => onHidden('departure')}
               />
            </div>

            <div
               className={`details-wrapper ${
                  isHidden.departure ? '' : 'hidden'
               } `}
            >
               <div className="details_info">
                  <p className="details_info-title">№ Поезда</p>
                  <p className="details_info-text details_info-text--train">
                     {departure.train.name}
                  </p>
               </div>
               <div className="details_info details_info--city">
                  <p className="details_info-title">Название</p>
                  <p className="details_info-text details_info-text--route">
                     {departure.from.city.name}
                     <br />
                     {departure.to.city.name}
                  </p>
               </div>
               <div className="details_info details_info--route">
                  <div className="route">
                     <div className="route_info">
                        <p className="route_time">
                           {moment
                              .unix(departure.from.datetime)
                              .format('HH:mm')}
                        </p>
                        <p className="route_date">
                           {moment
                              .unix(departure.from.datetime)
                              .format('DD.MM.YYYY')}
                        </p>
                     </div>
                     <div className="route_duration">
                        <p className="route_duration-time">
                           {formatSeconds(departure.duration)}
                        </p>
                        {departureSvg}
                     </div>
                     <div className="route_info route_info--right">
                        <p className="route_time">
                           {moment.unix(departure.to.datetime).format('hh:mm')}
                        </p>
                        <p className="route_date">
                           {moment
                              .unix(departure.to.datetime)
                              .format('DD.MM.YYYY')}
                        </p>
                     </div>
                  </div>
                  <div className="route">
                     <div className="route_info">
                        <p className="route_city">{departure.from.city.name}</p>
                        <p className="route_station">
                           {departure.from.railway_station_name}
                           <br />
                           вокзал
                        </p>
                     </div>
                     <div className="route_info route_info--right">
                        <p className="route_city">{departure.to.city.name}</p>
                        <p className="route_station">
                           {departure.to.railway_station_name}
                           <br />
                           вокзал
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {arrival && (
            <div className={`sidebar_inner ${arrival ? '' : 'hidden'}`}>
               <div className="sidebar_header title-go-back">
                  <h4 className="title title--small sidebar_title">
                     Обратно{' '}
                     <span className="sidebar_date">
                        {moment
                           .unix(arrival.from.datetime)
                           .format('DD.MM.YYYY')}
                     </span>
                  </h4>

                  <button
                     type="button"
                     className={`details_arrival details_button ${
                        !isHidden.arrival ? 'active-button' : 'inactive-button'
                     }`}
                     onClick={() => onHidden('arrival')}
                  />
               </div>

               <div
                  className={`details-wrapper ${
                     isHidden.arrival ? '' : 'hidden'
                  } `}
               >
                  <div className="details_info">
                     <p className="details_info-title">№ Поезда</p>
                     <p className="details_info-text details_info-text--train">
                        {arrival.train.name}
                     </p>
                  </div>
                  <div className="details_info details_info--city">
                     <p className="details_info-title">Название</p>
                     <p className="details_info-text details_info-text--route">
                        {arrival.from.city.name}
                        <br />
                        {arrival.to.city.name}
                     </p>
                  </div>
                  <div className="details_info details_info--route">
                     <div className="route">
                        <div className="route_info">
                           <p className="route_time">
                              {moment
                                 .unix(arrival.from.datetime)
                                 .format('HH:mm')}
                           </p>
                           <p className="route_date">
                              {moment
                                 .unix(arrival.from.datetime)
                                 .format('DD.MM.YYYY')}
                           </p>
                        </div>
                        <div className="route_duration">
                           <p className="route_duration-time">
                              {formatSeconds(arrival.duration)}
                           </p>
                           {arrivalSvg}
                        </div>
                        <div className="route_info route_info--right">
                           <p className="route_time">
                              {moment.unix(arrival.to.datetime).format('hh:mm')}
                           </p>
                           <p className="route_date">
                              {moment
                                 .unix(arrival.to.datetime)
                                 .format('DD.MM.YYYY')}
                           </p>
                        </div>
                     </div>
                     <div className="route">
                        <div className="route_info">
                           <p className="route_city">
                              {arrival.from.city.name}
                           </p>
                           <p className="route_station">
                              {arrival.from.railway_station_name}
                              <br />
                              вокзал
                           </p>
                        </div>
                        <div className="route_info route_info--right">
                           <p className="route_city">{arrival.to.city.name}</p>
                           <p className="route_station">
                              {arrival.to.railway_station_name}
                              <br />
                              вокзал
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

         <div className="sidebar_inner">
            <div className="sidebar_header sidebar_header--passengers">
               <h4 className="title title--small title-passengers">
                  Пассажиры
               </h4>
               <button
                  type="button"
                  className={`details_passengers details_button ${
                     !isHidden.passengers ? 'active-button' : 'inactive-button'
                  }`}
                  onClick={() => onHidden('passengers')}
               />
            </div>

            <div className={`${isHidden.passengers ? '' : 'hidden'} `}>
               <ul className="details_passenger-list">
                  <li className="details_passenger-item">
                     <span className="details_passenger-count">
                        {passengersCount.adult} Взрослы
                        {Number(passengersCount.adult) === 1 ? 'й' : 'х'}
                     </span>

                     <PriceFormat
                        title="details_passenger-price"
                        value={
                           arrival
                              ? passengersPrice.departure.adult +
                                passengersPrice.arrival.adult +
                                passengersPrice.departure.services +
                                passengersPrice.arrival.services
                              : passengersPrice.departure.adult +
                                passengersPrice.departure.services
                        }
                     />
                     <img className="details-currency" src={rub} alt="руб." />
                  </li>
                  {Number(passengersCount.child) +
                     Number(passengersCount.baby) >
                     0 && (
                     <li className="details_passenger-item">
                        <span className="details_passenger-count">
                           {Number(passengersCount.child) +
                              Number(passengersCount.baby)}{' '}
                           Ребен
                           {Number(passengersCount.child) +
                              Number(passengersCount.baby) ===
                           1
                              ? 'ок'
                              : 'ка'}
                        </span>
                        <PriceFormat
                           title="details_passenger-price"
                           value={
                              passengersPrice.departure.child +
                              passengersPrice.arrival.child
                           }
                        />
                        <img
                           className="details-currency"
                           src={rub}
                           alt="руб."
                        />
                     </li>
                  )}
               </ul>
            </div>
         </div>

         <div className="details_footer">
            <h3 className="title title--small details_footer-title">Итог</h3>
            <PriceFormat
               title="details_footer-total"
               value={
                  passengersPrice.departure.adult +
                  passengersPrice.arrival.adult +
                  passengersPrice.departure.child +
                  passengersPrice.arrival.child +
                  passengersPrice.departure.services +
                  passengersPrice.arrival.services
               }
            />
            <img className="details-currency-total" src={rub} alt="руб." />
         </div>
      </section>
   );
}
