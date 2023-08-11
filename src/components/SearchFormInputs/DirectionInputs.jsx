import React from "react";
import {useDispatch} from "react-redux";

import './SearchFormInputs.css';
import 'react-datepicker/dist/react-datepicker.css';
import circleArrows from "../../images/icons/circle-arrows.png";
import {cityExchange} from "../../slices/searchSlice";
import DirectionInput from "./DirectionInput";

function DirectionInputs() {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(cityExchange());
    }

    return (
        <div className='search-form-inputs'>
            <DirectionInput placeholder="Откуда" direction="routeFrom"/>
            <span className='search-form-inputs__arrows-wrapper'>
                <img
                    className='search-form-inputs__arrows'
                    src={circleArrows}
                    alt=""
                    onClick={handleClick}
                />
            </span>
            <DirectionInput placeholder="Куда" direction="routeIn"/>
        </div>
    );
}

export default DirectionInputs;
