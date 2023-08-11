import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import PropTypes from 'prop-types';
import {serviceItemSelect, serviceItemUnSelect} from "../../../slices/seatsSlice";

export default function Service({ service, type, id, disabled }) {
   const { services } = useSelector((state) => state.seats[type]);
   const dispatch = useDispatch();
   const handleClick = () => {
      if (services[id] && services[id].includes(service)) {
         dispatch(serviceItemUnSelect({ id, service, type }));
      } else {
         dispatch(serviceItemSelect({ id, service, type }));
      }
   };

   return (
       <button
           type="button"
           className={`service ${service}-service ${
               services[id] && services[id].includes(service)
                   ? `service--active ${service}-service--active`
                   : ''
           }`}
           onClick={handleClick}
           disabled={disabled}
       />
   );
}

Service.defaultProps = {
   disabled: false,
};

Service.propTypes = {
   service: PropTypes.string.isRequired,
   type: PropTypes.string.isRequired,
   id: PropTypes.number.isRequired,
   disabled: PropTypes.bool,
};
