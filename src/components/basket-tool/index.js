import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import './style.css';

function BasketTool({ sum, amount, onOpen, dictionary }) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <div className={cn('basket-controls')}>
        <span className={cn('label')}>{dictionary.label}</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
              one: dictionary.total[0],
              few: dictionary.total[1],
              many: dictionary.total[2]
            })} / ${numberFormat(sum)} ₽`
            : `${dictionary.standart}`
          }
        </span>
        <button onClick={onOpen}>{dictionary.action}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => { },
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
