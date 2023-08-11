import React from 'react';
import PropTypes from 'prop-types';

function Duration({hours, minutes}) {
    const formatHours = () => {
        if (hours > 9 && hours < 20) return 'часов';
        const hoursLastDigit = +hours.substring(hours.length - 1);
        switch (hoursLastDigit) {
            case 1:
                return 'час';
            case 2:
            case 3:
            case 4:
                return 'часа';
            default:
                return 'часов';
        }
    };

    const formatMinutes = () => {
        if (minutes > 9 && minutes < 20) return 'минут';
        const minutesLastDigit = +minutes.substring(minutes.length - 1);
        switch (minutesLastDigit) {
            case 1:
                return 'минута';
            case 2:
            case 3:
            case 4:
                return 'минуты';
            default:
                return 'минут';
        }
    };

    return (
        <div className="train__info-duration">
            {hours} {formatHours()}
            <br/>
            {minutes} {formatMinutes()}
        </div>
    );
}

Duration.propTypes = {
    hours: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    minutes: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
};

export default Duration;
