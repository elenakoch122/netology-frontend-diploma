import React from 'react';
import { useSelector } from "react-redux";
import './StageBar.css';

export default function StageBar() {
  const { stage } = useSelector((state) => state.stage);
  const stages = ['Билеты', 'Пассажиры', 'Оплата', 'Проверка'];
  const activ = stage - 1;

  return (
    <div className={`stageBar ${stage === 4 ? 'stageBar-yellow' : 'stageBar-gray'}`}>
      <ul className="stageBar_list stages_wrapper">
        {stages.map((el, index) => (
          <li
            className={`
              stageBar_list-item
              ${stage > index ? 'passed' : 'not-passed'}
              ${activ === index ? 'activ' : ''}
            `}
            key={el}
          >
            <span className="stageBar_list-icon">
              <span className="stageBar_list-stage">{index + 1}</span>
            </span>

            {el}
          </li>
        ))}
      </ul>
    </div>
  );
}