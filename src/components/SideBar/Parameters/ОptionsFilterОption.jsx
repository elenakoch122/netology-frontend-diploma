import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {filterChange} from '../../../slices/filterSlice';

function Option({name, alt, src}) {
    const {filter} = useSelector((state) => state);

    const dispatch = useDispatch();

    const handleChange = (event) => {
        const {target} = event;
        dispatch(filterChange({name: target.name, value: target.checked}));
    };

    return (
        <li className="options-filter__item">
            <div className="options-filter__icon">
                <img className="optionsFilter-image" src={src} alt={alt}/>
            </div>
            <p className="options-filter__title">{alt}</p>
            <div className="options-filter__form">
                <input
                    className="options-filter__checkbox"
                    type="checkbox"
                    name={name}
                    id={name}
                    checked={filter[name]}
                    onChange={handleChange}
                />
                <label
                    className={`options-filter__switch-label ${
                        filter[name] && 'is-on'
                    }`}
                    htmlFor={name}
                >
                    <span className="optionsFilter-switch-button"/>
                </label>
            </div>
        </li>
    );
}
Option.propTypes = {
    name: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
};

export default Option;
