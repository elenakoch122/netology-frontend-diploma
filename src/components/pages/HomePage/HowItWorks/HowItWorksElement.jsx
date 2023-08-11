import React from 'react';
import PropTypes from 'prop-types';

function HowItWorksElement(props) {
    const {image, text} = props;
    return (
        <div className='how-it-works__element'>
            <img className='how-it-works__element-image' src={image} alt=""/>
            <div className='how-it-works__element-text'>{text}</div>
        </div>
    )
}

HowItWorksElement.propTypes = {
    image: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}

export default HowItWorksElement;
