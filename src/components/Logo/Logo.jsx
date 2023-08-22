import React from 'react';
import './Logo.css';
import { Link } from 'react-router-dom';

export default function Logo() {
  return <Link to="/" className='logo'>Лого</Link>;
}