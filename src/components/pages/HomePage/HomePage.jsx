import React from 'react';

import About from './About/About';
import Footer from '../../Footer/Footer';
import HomePageHeader from './HomePageHeader/HomePageHeader';
import HowItWorks from './HowItWorks/HowItWorks';
import Reviews from './Reviews/Reviews';

export default function HomePage() {
  return (
    <div>
      <HomePageHeader />
      <About />
      <HowItWorks />
      <Reviews />
      <Footer />
    </div>
  );
}