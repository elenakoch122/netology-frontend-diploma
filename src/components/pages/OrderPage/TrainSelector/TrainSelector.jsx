import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {nanoid} from "nanoid";

import './TrainSelector.css';
import TrainCard from "../TrainCard/TrainCard";
import {stageChange} from "../../../../slices/stageSlice";
import {fetchRoutes} from "../../../../slices/routesSlice";
import {filterChange} from "../../../../slices/filterSlice";
import Pagination from "../../../Seats/Pagination/Pagination";

function TrainSelector() {
    const dispatch = useDispatch();
    const count = useSelector((state) => state.routes.total_count);
    const trains = useSelector((state) => state.routes.routes);
    const filter = useSelector((state) => state.filter);
    const search = useSelector((state) => state.search);
    const {sort, limit} = filter;

    const limits = [5, 10, 20];

    useEffect(() => {
        dispatch(stageChange({stage: 1}));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchRoutes());
    }, [filter, search, dispatch]);

    const handleChange = (name, value) => {
        dispatch(filterChange({name, value}));
    };

    return (
        <div className="train-selector">
            <div className="train-list_header">
                <div className="trains_totalCount">найдено {count}</div>

                <div className="train-list_sort">
                    <h5 className="train-list_sort-title">сортировать по:</h5>
                    <select
                        className="train-list_sort-list"
                        name="sort"
                        value={sort}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                    >
                        <option className="train-list_sort-item" value="time">
                            времени
                        </option>
                        <option className="train-list_sort-item" value="price_min">
                            стоимости
                        </option>
                        <option className="train-list_sort-item" value="duration">
                            длительности
                        </option>
                    </select>
                </div>

                <div className="train-list_view">
                    <h5 className="train-list-title">показывать по:</h5>
                    <ul className="train-list_view-list">
                        {limits.map((el) => (
                            <li
                                className={`train-list_view-item ${
                                    limit === el ? 'train-list_view-item--active' : ''
                                }`}
                                key={el}
                                onClick={() => handleChange('limit', el)}
                            >
                                {el}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <ul className="train-selector__cards">
                {
                    trains && trains.map((el) => (
                            <li><TrainCard key={nanoid()} train={el}/></li>
                        )
                    )
                }
            </ul>

            <Pagination/>
        </div>
    );
}

export default TrainSelector;
