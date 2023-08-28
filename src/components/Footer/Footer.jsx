import React from 'react';
import './Footer.css';

import Logo from '../Logo/Logo';
import phone from '../../images/icons/phone.png';
import email from '../../images/icons/email.png';
import skype from '../../images/icons/skype.png';
import geo from '../../images/icons/geo.png';
import youtube from '../../images/icons/youtube.png';
import linkedin from '../../images/icons/linkedin.png';
import google from '../../images/icons/google.png';
import facebook from '../../images/icons/facebook.png';
import twitter from '../../images/icons/twitter.png';
import upArrow from '../../images/icons/up-arrow.png';

export default function Footer() {
  return (
    <footer className="footer" id="contacts">
      <div className="footer_content content_wrapper">
        <div className="footer__contacts-wrapper">
          <section className="footer__contacts">
            <h3 className="footer_contacts-title footer-title">Свяжитесь с нами</h3>

            <ul className="footer__contacts-list">
              <li className="footer__contacts-item">
                <img className="footer__contacts-icon" src={phone} alt="" />
                <p className="footer__contacts-text">8 (800) 000 00 00</p>
              </li>

              <li className="footer__contacts-item">
                <img className="footer__contacts-icon" src={email} alt="" />
                <p className="footer__contacts-text">inbox@mail.ru</p>
              </li>

              <li className="footer__contacts-item">
                <img className="footer__contacts-icon" src={skype} alt="" />
                <p className="footer__contacts-text">tu.train.tickets</p>
              </li>

              <li className="footer__contacts-item">
                <img className="footer__contacts-icon" src={geo} alt="" />
                <p className="footer__contacts-text">
                  г. Москва<br />
                  ул. Московская 27-35<br />
                  555 555
                </p>
              </li>
            </ul>
          </section>

          <section className="footer__subscribe">
            <h3 className="footer_subscribe-title footer-title">Подписка</h3>

            <label className="footer__form-label" htmlFor="subscription">
              Будьте в курсе событий

              <form>
                <div className="input-wrapper">
                  <input
                    className="footer__form-input"
                    type="email"
                    id="subscription"
                    placeholder="e-mail"
                  />
                  <button
                    className="footer__form-button"
                    id="button"
                    type="submit"
                  >
                    Отправить
                  </button>
                </div>
              </form>
            </label>

            <h3 className="footer_subscribe-title footer-title second-title ">Подписывайтесь на нас</h3>

            <div className="footer_subscribe-icons">
              <a href="#/" className="footer__subscribe-link" title='Youtube'>
                <img src={youtube} alt="" />
              </a>

              <a href="#/" className="footer__subscribe-link" title='Linked In'>
                <img src={linkedin} alt="" />
              </a>

              <a href="#/" className="footer__subscribe-link" title='Google'>
                <img src={google} alt="" />
              </a>

              <a href="#/" className="footer__subscribe-link" title='Facebook'>
                <img src={facebook} alt="" />
              </a>

              <a href="#/" className="footer__subscribe-link" title='Twitter'>
                <img src={twitter} alt="" />
              </a>
            </div>
          </section>
        </div>
      </div>

      <div className='line' />

      <div className='footer__bottom-wrapper'>
        <Logo />
        <img
          className='footer__up-arrow'
          src={upArrow}
          alt=""
          title="Перейти наверх страницы"
          onClick={() => { document.documentElement.scrollTop = 0 }}
        />
        <span className='footer__bottom-wrapper-text'>2018 WEB</span>
      </div>
    </footer>
  );
}