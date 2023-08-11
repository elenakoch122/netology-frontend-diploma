/* eslint-disable no-underscore-dangle */
import React, {useEffect, useState} from 'react';
import LastTicket from './LastTicket';
import './LastTickets.css';

function LastTickets() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_URL}routes/last`)
            .then((response) => response.json())
            .then((data) => setItems(data))
            .catch(() => {
            });
    }, []);

    const onClick = () => {

    };

    if (items.length === 0) return '';
    return (
        <section className="last" onClick={onClick}>
            <h3 className="last_title">Последние билеты</h3>
            <div className="last_list">
                {items.map((item) => (
                    <LastTicket ticket={item} key={item.departure._id}/>
                ))}
            </div>
        </section>
    );
}

export default LastTickets;
