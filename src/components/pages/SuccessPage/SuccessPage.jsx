import React from 'react';
import './SuccessPage.css';

import Logo from "../../Logo/Logo";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import SuccessOrder from "./SuccessOrder/SuccessOrder";

export default function SuccessPage() {
  return (
    <div className="success-page">
      <div className="success-page-header">
        <div className="logo-wrapper">
          <Logo />
        </div>

        <div className="menu-wrapper">
          <Menu />
        </div>
      </div>

      <SuccessOrder />
      <Footer />
    </div>
  );
}