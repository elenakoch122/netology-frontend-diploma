import React from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";

import './OrderSearchForm.css';
import DirectionInputs from "../../../SearchFormInputs/DirectionInputs";
import InputDatePicker from "../../../SearchFormInputs/InputDatePicker";
import {fetchRoutes} from "../../../../slices/routesSlice";

function OrderSearchForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchRoutes());
    navigate('/order/tickets/train');
    document.documentElement.scrollTop = 0;
  }

  return (
    <div className="order-search-form-wrapper">
      <form className='order-search-form'>
        <div className='order-search-form__inputs'>
          <label className='search-form__label'>
            Направление
            <DirectionInputs />
          </label>

          <label className='search-form__label'>
            Дата
            <InputDatePicker />
          </label>
        </div>
        <div className='order-search-form__button-wrapper'>
          <button className='order-search-form__button' type='button' onClick={onSubmit}>Найти билеты</button>
        </div>
      </form>
    </div>
  )
}

export default OrderSearchForm;
