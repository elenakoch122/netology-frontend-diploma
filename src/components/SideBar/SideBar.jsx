import React from 'react';
import {useSelector} from 'react-redux';

import './SideBar.css';
import Parameters from './Parameters/Parameters';
import Details from './Details/Details';
import LastTickets from "../pages/OrderPage/LastTickets/LastTickets";

function SideBar() {
    const {stage} = useSelector((state) => state.stage);
    return (
        <div>
            <div className="side-bar">
                {stage === 1 ? (
                    <div>
                        <Parameters/>
                    </div>
                ) : (
                    <div>
                        <Details/>
                    </div>
                )}
            </div>
            {stage === 1 && <LastTickets/>}
        </div>
    );
}

export default SideBar;
