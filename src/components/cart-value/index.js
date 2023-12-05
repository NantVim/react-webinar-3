import React from "react";
import PropTypes from 'prop-types';
import {numberSpaces} from '../../utils';
import './style.css'


function CartValue({cartValue}) {
    return (
        <div className='Cart-info'>
            <strong className='Info-title'>Итого</strong>
            <strong className='Info-data'>{numberSpaces(cartValue)} ₽</strong>
        </div>
    );
}

CartValue.PropTypes = {
    cartValue: PropTypes.number
}

export default React.memo(CartValue);