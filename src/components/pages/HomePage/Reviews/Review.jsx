import React from 'react';
import PropTypes from 'prop-types';
import './Reviews.css';

export default function Review(props) {
  const { image, name, text } = props;

  return (
    <div className='review'>
      <img className='review__image' src={image} alt="" />

      <div>
        <h3 className='review__name'>{name}</h3>
        <p className='review__text'>“{text}”</p>
      </div>
    </div>
  )
}

Review.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}