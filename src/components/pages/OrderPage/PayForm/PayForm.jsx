import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import './PayForm.css';

import { stageChange } from "../../../../slices/stageSlice";
import { addPayerData } from "../../../../slices/paySlice";

export default function PayForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { payer } = useSelector(state => state.pay);

  const [form, setForm] = useState({
    surname: payer?.surname || '',
    name: payer?.name || '',
    lastname: payer?.lastname || '',
    phone: payer?.phone || '',
    email: payer?.email || '',
    pay: payer?.pay || '',
  });
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    dispatch(stageChange({ stage: 3 }));
  }, [dispatch]);

  useEffect(() => {
    setDisabled(true);

    if (
      !(
        form.surname &&
        form.name &&
        form.lastname &&
        form.phone &&
        form.email &&
        form.pay
      )
    )
      return;

    setDisabled(false);
  }, [form]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadio = (event) => {
    setForm((prev) => ({ ...prev, pay: event.target.id }));
  };

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(addPayerData({ data: form }));
    navigate('/order/verification/');
  };

  const onChangePhone = (event) => {
    const { name, value } = event.target;

    if (value.length === 1) {
      setForm((prev) => ({ ...prev, [name]: `+7${value}` }));
      return;
    }

    if (value.length === 2) {
      setForm((prev) => ({ ...prev, [name]: '' }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: `+7${value.substring(2)}` }));
  };

  return (
    <section className="pay-form order_payForm">
      <form>
        <div className="pay-form_form" id="payform">
          <h4 className="pay-form_title">Персональные данные</h4>

          <div className="pay-form_wrapper">
            <div className="pay-form-controls payForm-controls--name">
              <label className="pay-form_label" htmlFor="surname">
                Фамилия
                <input
                  className="pay-form_field"
                  id="surname"
                  name="surname"
                  type="text"
                  value={form.surname}
                  onChange={handleChange}
                />
              </label>

              <label className="pay-form_label" htmlFor="name">
                Имя
                <input
                  className="pay-form_field"
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                />
              </label>

              <label className="pay-form_label" htmlFor="last-name">
                Отчество
                <input
                  className="pay-form_field"
                  id="last-name"
                  name="lastname"
                  type="text"
                  value={form.lastname}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="pay-form-controls pay-form-controls-contacts">
              <label
                className="pay-form_label pay-form_label-contact"
                htmlFor="phone"
              >
                Контактный телефон
                <input
                  className="pay-form_field payForm_field-contact"
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+7 ___ ___ __ __"
                  value={form.phone}
                  maxLength="12"
                  onChange={onChangePhone}
                  required
                />
              </label>

              <label
                className="pay-form_label pay-form_label-contact"
                htmlFor="email"
              >
                E-mail
                <input
                  className="pay-form_field payForm_field-contact"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="inbox@gmail.ru"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
          </div>

          <section className="payForm_payment">
            <h4 className="pay-form_title pay-form_title-repeat">Способ оплаты</h4>

            <div className="pay-form_controls-group">
              <input
                className="pay-form_field-control"
                type="radio"
                name="payment"
                id="online"
                checked={form.pay === 'online'}
                onChange={handleRadio}
              />

              <label
                className="pay-form_label pay-form_label-radio"
                htmlFor="online"
              >
                Онлайн
              </label>

              <ul className="pay-form_pay-list">
                <li className="pay-form_pay-item">
                  Банковской<br />
                  картой
                </li>

                <li className="pay-form_pay-item">PayPal</li>
                <li className="pay-form_pay-item">Visa QIWI Wallet</li>
              </ul>
            </div>

            <div className="pay-form_controls-group">
              <input
                className="pay-form_field-control"
                type="radio"
                name="payment"
                id="cash"
                checked={form.pay === 'cash'}
                onChange={handleRadio}
              />

              <label
                className="pay-form_label pay-form_label-radio"
                htmlFor="cash"
              >
                Наличными
              </label>
            </div>
          </section>
        </div>

        <div className="pay-form_buttons">
          <button
            type="submit"
            className="button pay-form_button"
            form="payform"
            onClick={handleClick}
            disabled={disabled}
          >
            Купить билеты
          </button>
        </div>
      </form>
    </section>
  );
}