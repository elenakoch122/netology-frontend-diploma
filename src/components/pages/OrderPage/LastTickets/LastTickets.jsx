/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import LastTicket from './LastTicket';
import './LastTickets.css';

export default function LastTickets() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}routes/last`)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch(() => {
      });
  }, []);

  if (items.length === 0) return '';

  return (
    <section className="last">
      <h3 className="last_title">Последние билеты</h3>

      <div className="last_list">
        {items.map((item) => (
          <LastTicket ticket={item} key={item.departure._id} />
        ))}
      </div>
    </section>
  );
}