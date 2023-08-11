import React from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from 'react-router';
import './SearchForm.css';

import InputDatePicker from "../../../SearchFormInputs/InputDatePicker";
import DirectionInputs from "../../../SearchFormInputs/DirectionInputs";
import {fetchRoutes} from "../../../../slices/routesSlice";

export default function SearchForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchRoutes());
    navigate('/order/tickets/train');
    document.documentElement.scrollTop = 0;
  }

  return (
    <form className='search-form'>
      <div className="search-form__block">
        <label className='search-form__label'>
          Направление
          <DirectionInputs/>
        </label>
      </div>

      <div className="search-form__block">
        <label className='search-form__label'>
          Дата
          <InputDatePicker/>
        </label>
      </div>

      <button className='search-form__button' type='button' onClick={onSubmit}>Найти билеты</button>
    </form>
  )
}