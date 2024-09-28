import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../utils/utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

const cn = bem('ItemBasket');

function ItemBasket(props) {
  const callbacks = {
    onRemove: e => props.onRemove(props.item._id),
    onNavigate: (e) => {
      e.preventDefault();
      if (props.onNavigate) {
        props.onNavigate(props.item._id);
      }
    },
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <div className={cn('nav')} onClick={callbacks.onNavigate}>
          <span className={cn('title-text')}>{props.item.title}</span>
        </div>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
};

export default memo(ItemBasket);
