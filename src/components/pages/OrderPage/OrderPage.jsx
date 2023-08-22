import React from 'react';
import { Route } from "react-router-dom";
import { Routes } from "react-router";
import './OrderPage.css';

import OrderPageHeader from './OrderPageHeader/OrderPageHeader';
import Footer from '../../Footer/Footer';
import SideBar from '../../SideBar/SideBar';
import TrainSelector from "./TrainSelector/TrainSelector";
import Seats from "../../Seats/Seats";
import PayForm from "./PayForm/PayForm";
import Passengers from "./Passengers/Passengers";
import Verification from "./Verification/Verification";

export default function OrderPage() {
  return (
    <div className="order-page">
      <OrderPageHeader />

      <main className="order-page__content">
        <div><SideBar /></div>

        <Routes>
          <Route path="/tickets/train" element={<TrainSelector />} />
          <Route path="/tickets/seats" element={<Seats />} />
          <Route path="/passengers/" element={<Passengers />} />
          <Route path="/pay/" element={<PayForm />} />
          <Route path="/verification/" element={<Verification />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}