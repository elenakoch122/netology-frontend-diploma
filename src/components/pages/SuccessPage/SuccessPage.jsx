import React from 'react';
import './SuccessPage.css';
import Logo from "../../Logo/Logo";
import Menu from "../../Menu/Menu";
import Footer from "../../Footer/Footer";
import SuccessOrder from "./SuccessOrder/SuccessOrder";

function SuccessPage() {
    return (
        <div className="success-page">
            <div className="success-page-header">
                <Logo/>
                <Menu/>
                <div className="success-page-title">Благодарим Вас за заказ!</div>
            </div>
            <SuccessOrder/>
            <Footer/>
        </div>
    );
}

export default SuccessPage;
