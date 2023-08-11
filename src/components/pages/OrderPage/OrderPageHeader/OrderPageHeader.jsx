import React from 'react';
import './OrderPageHeader.css';
import Logo from "../../../Logo/Logo";
import Menu from "../../../Menu/Menu";
import OrderSearchForm from "../OrderSearchForm/OrderSearchForm";
import StageBar from "../StageBar/StageBar";


export default function OrderPageHeader() {
  return (
    <header className='order-page-header'>
      <div className="logo-wrapper">
        <Logo />
      </div>
      <Menu/>
      <OrderSearchForm/>
      <StageBar/>
    </header>
  );
}