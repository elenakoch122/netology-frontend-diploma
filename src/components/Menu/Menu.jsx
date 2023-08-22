import React from 'react';
import { HashLink } from 'react-router-hash-link';
import './Menu.css';

export default function Menu() {
  const list = [
    { text: 'О нас', link: '/#about' },
    { text: 'Как это работает', link: '/#how-it-works' },
    { text: 'Отзывы', link: '/#reviews' },
    { text: 'Контакты', link: '/#contacts' },
  ];

  return (
    <nav>
      <ul className='menu'>
        {list.map(i => <li className='menu__item' key={i.link}>
          <HashLink className='menu__item-text' to={i.link}>{i.text}</HashLink>
        </li>)}
      </ul>
    </nav>
  )
}