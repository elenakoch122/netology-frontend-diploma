/* eslint-disable no-underscore-dangle */
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";

import './SearchFormInputs.css';
import 'react-datepicker/dist/react-datepicker.css';
import {searchFieldChange} from "../../slices/searchSlice";


function DirectionInput({placeholder, direction}) {
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState('');
    const {routeFrom, routeIn} = useSelector((state) => state.search);
    const route = direction === 'routeFrom' ? routeFrom.city : routeIn.city;
    const [cities, setCities] = useState(route);

    useEffect(() => {
        setValue(route);
        const controller = new AbortController();
        fetch(`${process.env.REACT_APP_URL}routes/cities?name=${route || 'А'}`, {
            signal: controller.signal,
        })
            .then((response) => response.json())
            .then((data) => {
                setCities(data);
                return () => controller.abort();
            });
    }, [route]);

    const onBlur = (event) => {
        event.preventDefault();
        setTimeout(() => setVisible(false), 1000);
    };

    const dispatch = useDispatch();

    const onFieldChangeDispatch = (id, city) => {
        setValue(city);
        dispatch(
            searchFieldChange({
                name: direction,
                value: {
                    id,
                    city,
                },
            })
        );
    };

    const onFieldChange = (e) => {
        const {target} = e;
        setValue(target.value);
        const cityObj =
            cities &&
            cities.find((city) => city.name === target.value.toLowerCase());
        const id = cityObj ? cityObj._id : '';
        onFieldChangeDispatch(id, target.value);
    };

    return (
        <div className="search-form_route-container">
            <input
                id="cities"
                className='search-form-inputs__direction-input'
                type="text"
                placeholder={placeholder || ''}
                onClick={() => setVisible(true)}
                onChange={onFieldChange}
                onBlur={onBlur}
                name={direction}
                value={value}
            />
            {visible && (
                <div className="autocomplete-list">
                    {cities.length > 0 ? (
                        cities.map((city) => (
                            <p
                                className="autocomplete-item"
                                key={city._id}
                                onClick={() =>
                                    onFieldChangeDispatch(city._id, city.name)
                                }
                            >
                                {city.name}
                            </p>
                        ))
                    ) : (
                        <p className="autocomplete-item">Направление не найдено!</p>
                    )}
                </div>
            )}
        </div>
    );
}

DirectionInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired,
}

export default DirectionInput;
