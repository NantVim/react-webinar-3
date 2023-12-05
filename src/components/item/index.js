import React, {useState} from "react";
import PropTypes from "prop-types";
import {plural, numberSpaces} from "../../utils";
import './style.css';

function Item(props) {

  // Счётчик выделений
  const [count, setCount] = useState(0);

  const callbacks = {
    onClick: () => {
      props.onSelect(props.item.code);
      if (!props.item.selected) {
        setCount(count + 1);
      }
    },
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },
    onAddItem: (e) => {
      e.stopPropagation();
      props.onAction(props.item.code);
    }
  }

  return (
    <div className={'Item' + (props.item.selected ? ' Item_selected' : '')}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title} {count ? ` | Выделяли ${count} ${plural(count, {
        one: 'раз',
        few: 'раза',
        many: 'раз'
      })}` : ''}
      </div>
      <div className='Item-price'>{numberSpaces(props.item.price)} ₽</div>
      {props.item.count && <div className='Item-count'>{props.item.count ? `${props.item.count} шт` : ''}</div>}
      <div className='Item-actions'>
        <button onClick={callbacks.onAddItem}>
          {props.actionTitle}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  actionTitle: PropTypes.string,
  onAction: PropTypes.func
};

Item.defaultProps = {
  onAction: () => {},
}

export default React.memo(Item);
