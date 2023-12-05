import React from "react";
import PropTypes from 'prop-types';
import {plural, numberSpaces} from "../../utils";
import './style.css';

function Controls({cartValue, cartItemCount, onAction}) {
  return (
    <div className='Controls'>
      <div className='Controls-data'>В корзине: &nbsp;
        <strong>{cartItemCount ? ` ${cartItemCount} ${plural(cartItemCount, {
        one: 'товар',
        few: 'товара',
        many: 'товаров'
      })}` : ''}</strong>
      <strong>&nbsp;{cartItemCount ? `/ ${numberSpaces(cartValue)} ₽` : 'пусто'}</strong>
      </div>
      <div className='Controls-actions'>
        <button onClick={() => onAction()}>&nbsp;Перейти&nbsp;</button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  cartValue: PropTypes.number,
  cartItemCount: PropTypes.number,
  onAction: PropTypes.func
};

Controls.defaultProps = {
  onAction: () => {}
}

export default React.memo(Controls);
