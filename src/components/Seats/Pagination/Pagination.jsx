import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {filterChange} from '../../../slices/filterSlice';
import './Pagination.css';

export default function Pagination() {
    const dispatch = useDispatch();

    const [pages, setPages] = useState([]);
    const {limit, offset} = useSelector((state) => state.filter);
    const count = useSelector((state) => state.routes.total_count);

    const currentPage = Math.trunc(offset / limit + 1);

    useEffect(() => {
        const arr = [];
        for (let i = 1; i <= Math.ceil(count / limit); i += 1) {
            arr.push(i);
        }
        setPages(arr);
    }, [count, limit]);

    const goToPage = (page) => {
        const delta = page - currentPage;
        let newOffset = limit * (currentPage - 1) + limit * delta;

        if (newOffset < 0) newOffset = 0;

        if (Math.trunc(newOffset / limit + 1) > pages.length)
            newOffset = (pages.length - 1) * limit;

        dispatch(filterChange({name: 'offset', value: newOffset}));
    };

    if (pages.length < 2) return <div className="pagination"/>;
    return (
        <div className="pagination">
            <ul className="pagination-list">
                <li
                    className='pagination-item pagination-button--prev'
                    onClick={() => goToPage(currentPage - 1)}
                />
                {pages.length < 5 ? (
                    pages.map((el) => (
                        <li
                            className={`pagination-item ${
                                currentPage === el ? 'active' : ''
                            }`}
                            key={el}
                            onClick={() => goToPage(el)}
                        >
                            {el}
                        </li>
                    ))
                ) : (
                    <>
                        {pages.slice((currentPage > 1 ? currentPage : 2) - 2, (currentPage > 1 ? currentPage : 2) + 1).map((el) => (
                            <li
                                className={`pagination-item ${
                                    currentPage === el ? 'active' : ''
                                }`}
                                key={el}
                                onClick={() => goToPage(el)}
                            >
                                {el}
                            </li>
                        ))}
                        {(currentPage < pages.length - 2) && <li className="pagination-item" key={0}>
                            ...
                        </li>}
                        {(currentPage < pages.length - 1) && pages.slice(-1).map((el) => (
                            <li
                                className={`pagination-item ${
                                    currentPage === el ? 'active' : ''
                                }`}
                                key={el}
                                onClick={() => goToPage(el)}
                            >
                                {el}
                            </li>
                        ))}
                        <li
                            className='pagination-item pagination-button--next'
                            onClick={() => goToPage(currentPage + 1)}
                        />
                    </>
                )}
            </ul>
        </div>
    );
}
