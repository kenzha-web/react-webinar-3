import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {formatPrice} from "../../utils";
import {cn as bem} from "@bem-react/classname";

const cn = bem("Item");

function ProductItem({item, onAddToBasket}) {

  const callbacks = {
    onAddToBasket: e => {
      e.stopPropagation();
      onAddToBasket?.(item.code);
    },
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
      <div className="Item-actions">
        <button className={cn('btn')} onClick={callbacks.onAddToBasket}>Добавить</button>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAddToBasket: PropTypes.func,
};

export default React.memo(ProductItem);
