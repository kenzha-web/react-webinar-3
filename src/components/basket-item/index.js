import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import {formatPrice} from "../../utils";
import {cn as bem} from "@bem-react/classname";

const cn = bem("Item");

function BasketItem({item, onDelete}) {

  const callbacks = {
    onDelete: e => {
      e.stopPropagation();
      onDelete?.(item.code);
    }
  };

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('price')}>
        {`${formatPrice(item.price)}`}
      </div>
      <div className={cn('count')}>
        {`${item.quantity} шт`}
      </div>
      <div className={cn('actions')}>
        <button className={cn('btn')} onClick={callbacks.onDelete}>Удалить</button>
      </div>
    </div>
  );
}

BasketItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
};

export default React.memo(BasketItem);
