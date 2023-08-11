import React from 'react';
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";

import rub from '../../../../images/tickets/tickets-rub.svg';
import sendTickets from '../../../../images/success/sendTickets.svg';
import printTickets from '../../../../images/success/printTickets.svg';
import conductor from '../../../../images/success/conductor.svg';
import rating from '../../../../images/success/rating.svg';
import './SuccessOrder.css';
import PriceFormat from "../../../PriceFormat/PriceFormat";

function SuccessOrder() {
    const navigate = useNavigate();

    const {passengersPrice} = useSelector((state) => state.passengers);
    const {payer} = useSelector((state) => state.pay);

    const handleClick = () => {
        navigate('/');
        document.documentElement.scrollTop = 0;
    };

    return (
        <div className="success-order-wrapper">
            <div className="success-order">
                <div className="success-order__header">
                    <p className="success-order__title">№Заказа 285АА</p>
                    <p className="success-order__price">
                        сумма{' '}
                        <PriceFormat
                            title="successOrder"
                            value={
                                passengersPrice.departure.child +
                                passengersPrice.departure.adult +
                                passengersPrice.departure.services +
                                passengersPrice.arrival.child +
                                passengersPrice.arrival.adult +
                                passengersPrice.arrival.services
                            }
                        />
                        <img className="success-order__currency" src={rub} alt="руб."/>
                    </p>
                </div>

                <div className="success-order__instructions">
                    <div className="success-order__instructions-wrapper">
                        <div className="success-order__instruction">
                            <div className="success-order__instruction-icon">
                                <img
                                    className="success-order__instruction-image"
                                    src={sendTickets}
                                    alt="билеты будут отправлены
                    на ваш e-mail"
                                />
                            </div>
                            <p className="success-order__instruction-text">
                                билеты будут
                                <br/>
                                отправлены
                                <br/>
                                на ваш <strong>e-mail</strong>
                            </p>
                        </div>
                        <div className="success-order__instruction">
                            <div className="success-order__instruction-icon">
                                <img
                                    className="success-order__instruction-image"
                                    src={printTickets}
                                    alt="распечатайте
                    и сохраняйте билеты
                    до даты поездки"
                                />
                            </div>
                            <p className="success-order__instruction-text">
                                <strong>распечатайте </strong>
                                <br/>и сохраняйте билеты
                                <br/>
                                до даты поездки
                            </p>
                        </div>
                        <div className="success-order__instruction">
                            <div className="success-order__instruction-icon">
                                <img
                                    className="success-order__instruction-image"
                                    src={conductor}
                                    alt="предъявите распечатанные
                    билеты при посадке"
                                />
                            </div>
                            <p className="success-order__instruction-text">
                                <strong>предъявите </strong>
                                <br/>
                                распечатанные
                                <br/>
                                билеты при посадке
                            </p>
                        </div>
                    </div>
                </div>
                <section className="success-order__message">
                    <h3 className="success-order__message-title">
                        {payer.name} {payer.lastname}!
                    </h3>
                    <p className="success-order__message-text">
                        Ваш заказ успешно оформлен.
                        <br/>В ближайшее время с вами свяжется наш оператор для
                        подтверждения.
                    </p>
                    <p className="success-order__message-text">
                        <strong>
                            Благодарим Вас за оказанное доверие и желаем приятного
                            путешествия!
                        </strong>
                    </p>
                </section>
                <div className="success-order__footer">
                    <div className="success-order__footer-form">
                        <p className="success-order__footer-title">Оценить сервис</p>
                        <div className="success-order__footer-icons">
                            <img
                                className="success-order__footer-icon"
                                src={rating}
                                alt="Оценить сервис"
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="button success-order__footer-button"
                        onClick={handleClick}
                    >
                        Вернуться на главную
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SuccessOrder;
