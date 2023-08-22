import React from 'react';
import './HomePageHeader.css';

import Logo from '../../../Logo/Logo';
import Menu from '../../../Menu/Menu';
import SearchForm from '../SearchForm/SearchForm';

export default function HomePageHeader() {
  return (
    <header className='home-page'>
      <div className="logo-wrapper">
        <Logo />
      </div>

      <Menu />

      <main className='home-header'>
        <div className='header-title'>
          <p className='header-title__tagline'>Вся жизнь - <em>путешествие!</em></p>
        </div>

        <SearchForm />
      </main>
    </header>
  );
}