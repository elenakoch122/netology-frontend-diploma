import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";

import './PassengerForm.css';
import validateDocument from "./validateDocument";
import {addPassengersData} from "../../../../slices/passengersSlice";

function PassengerForm({number, type}) {
    const dispatch = useDispatch();

    const [active, setActive] = useState(false);

    const {passengers} = useSelector((state) => state.passengers);
    const passenger = passengers.find((e) => e.number === number);

    const [documentType, setDocumentType] = useState(
        type === 'adult' || (passenger && passenger.series)
            ? 'passport'
            : 'certificate'
    );

    const [form, setForm] = useState({
        number,
        type,
        surname: passenger ? passenger.surname : '',
        name: passenger ? passenger.name : '',
        lastname: passenger ? passenger.lastname : '',
        sex: passenger ? passenger.sex : '',
        birth: passenger ? passenger.birth : '',
        series: passenger ? passenger.series : '',
        document: passenger ? passenger.document : '',
    });
    const [message, setMessage] = useState('');

    const handleShow = () => {
        setActive((prev) => !prev);
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setForm((prev) => ({...prev, [name]: value}));
    };

    const handleRadio = (event) => {
        setForm((prev) => ({...prev, sex: event.target.dataset.id}));
    };

    const manageMessages = (text) => {
        setMessage(text);
        setTimeout(() => setMessage(''), 10 * 1000);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!(form.surname.trim() && form.name.trim() && form.lastname.trim())) {
            manageMessages('Необходимо ввести фамилию, имя и отчество пассажира');
            return;
        }
        if (!form.sex) {
            manageMessages('Выберите пол пассажира');
            return;
        }
        if (!form.birth) {
            manageMessages('Укажите дату рождения в формате дд-мм-гг');
            return;
        }
        if (
            documentType === 'certificate' &&
            !validateDocument(documentType, form.document)
        ) {
            manageMessages(
                'Номер свидетельства о рожденни указан некорректно Пример: VIII-ЫП-123456'
            );
            return;
        }
        if (
            documentType === 'passport' &&
            (!(form.series && validateDocument('series', form.series)) ||
                !validateDocument(documentType, form.document))
        ) {
            manageMessages('Номер или серия паспорта введы не некорректно');
            return;
        }
        setMessage('');
        dispatch(addPassengersData({number, data: form}));
    };

    return (
        <div className="passengerForm">
            <div className={`passenger_header ${active ? 'active-form' : ''}`}>
                <h4 className="title title--small passenger_title">
               <span
                   className={`passenger_toggle ${active ? 'hide' : 'show'}`}
                   onClick={handleShow}
               />
                    Пассажир {number}
                </h4>
                <button type="button" className="passenger_delete-button"/>
            </div>

            <div
                className={`passengerForm_form ${
                    active ? 'passengerForm--active' : 'hidden'
                }`}
            >
                <form className="passengerForm-section">
                    <select
                        className="passengerForm-field passengerForm-list"
                        defaultValue={type}
                        disabled
                    >
                        <option className="passengerForm-item" value="adult">
                            Взрослый
                        </option>
                        <option className="passengerForm-item" value="child">
                            Детский
                        </option>
                    </select>
                    <div className="passengerForm-controls">
                        <label
                            className="passengerForm-label"
                            htmlFor={`surname${number}`}
                        >
                            Фамилия
                            <input
                                className="passengerForm-field passengerForm-field--name"
                                id={`surname${number}`}
                                type="text"
                                name="surname"
                                value={form.surname}
                                onChange={handleChange}
                            />
                        </label>
                        <label
                            className="passengerForm-label"
                            htmlFor={`name${number}`}
                        >
                            Имя
                            <input
                                className="passengerForm-field passengerForm-field--name"
                                id={`name${number}`}
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </label>
                        <label
                            className="passengerForm-label"
                            htmlFor={`lastname${number}`}
                        >
                            Отчество
                            <input
                                className="passengerForm-field passengerForm-field--name"
                                id={`lastname${number}`}
                                type="text"
                                name="lastname"
                                value={form.lastname}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                </form>

                <div className="passengerForm-controls passengerForm-section">
                    <div className="passengerForm-radio-group">
                        <p className="passengerForm-label">Пол</p>
                        <div className="passengerForm_radio-controls">
                            <input
                                className="passengerForm_radio-field"
                                id={`male${number}`}
                                data-id="male"
                                name={`sex${number}`}
                                type="radio"
                                checked={form.sex === 'male'}
                                onChange={handleRadio}
                            />
                            <label
                                className="passengerForm_radio-label passengerForm_radio-label--male"
                                htmlFor={`male${number}`}
                            >
                                М
                            </label>
                            <input
                                className="passengerForm_radio-field"
                                id={`female${number}`}
                                data-id="female"
                                name={`sex${number}`}
                                type="radio"
                                checked={form.sex === 'female'}
                                onChange={handleRadio}
                            />
                            <label
                                className="passengerForm_radio-label passengerForm_radio-label--female"
                                htmlFor={`female${number}`}
                            >
                                Ж
                            </label>
                        </div>
                    </div>

                    <label
                        className="passengerForm-label"
                        htmlFor={`birth${number}`}
                    >
                        Дата рождения
                        <input
                            className="passengerForm-field"
                            id={`birth${number}`}
                            type="text"
                            placeholder="ДД/ММ/ГГ"
                            name="birth"
                            value={form.birth}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="passengerForm-controls passengerForm-section checkbox-control">
                    <input className="passengerForm_checkbox" type="checkbox"/>
                    <p className="passengerForm_checkbox-label">
                        ограниченная подвижность
                    </p>
                </div>

                <div className="passengerForm-section">
                    <div className="passengerForm_document">
                        <label className="passengerForm-label">
                            Тип документа
                            <select
                                className={`passengerForm-field passengerForm-list passengerForm-list--${documentType}`}
                                value={documentType}
                                onChange={(event) =>
                                    setDocumentType(event.target.value)
                                }
                            >
                                <option className="passengerForm-item" value="passport">
                                    Паспорт РФ
                                </option>
                                {type !== 'adult' ? (
                                    <option
                                        className="passengerForm-item"
                                        value="certificate"
                                    >
                                        Свидетельство о рождении
                                    </option>
                                ) : (
                                    ''
                                )}
                            </select>
                        </label>
                        {documentType === 'passport' && (
                            <label
                                className="passengerForm-label"
                                htmlFor={`series${number}`}
                            >
                                Серия
                                <input
                                    className="passengerForm-field passengerForm-field--document"
                                    id={`series${number}`}
                                    type="text"
                                    placeholder="_ _ _ _"
                                    name="series"
                                    maxLength="4"
                                    value={form.series}
                                    onChange={handleChange}
                                />
                            </label>
                        )}
                        <label
                            className="passengerForm-label"
                            htmlFor={`document${number}`}
                        >
                            Номер
                            <input
                                className="passengerForm-field passengerForm-field--document"
                                id={`document${number}`}
                                type="text"
                                placeholder={
                                    documentType === 'passport'
                                        ? '_ _ _ _ _ _'
                                        : '12 символов'
                                }
                                maxLength={
                                    documentType === 'passport'
                                        ? "6"
                                        : "12"
                                }
                                name="document"
                                value={form.document}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                </div>
                <div
                    className={`passengerForm-footer passengerForm-section ${
                        passenger ? 'done' : ''
                    } ${message ? 'warning' : ''}`}
                >
                    {passenger && (
                        <div className="passengerForm-massage">
                            <span className="massage-done-img"/>
                            <span className="massage-done">Готово</span>
                        </div>
                    )}
                    {message ? (
                        <div className="passengerForm-massage">
                            <span className="massage-warning-img"/>
                            <span className="massage-warning">{message}</span>
                        </div>
                    ) : (
                        <button
                            type="button"
                            className="button passengerForm-button"
                            onClick={onSubmit}
                        >
                            Следующий пассажир
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

PassengerForm.propTypes = {
    type: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
};

export default PassengerForm;
