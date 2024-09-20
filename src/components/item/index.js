import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {formatPrice} from "../../utils";

function Item(props) {
  const {
    item,
    onDelete = () => {},
    onAddToBasket = () => {},
    isOpen
  } = props

  const callbacks = {
    onDelete: e => {
      e.stopPropagation();
      onDelete(item.code);
    },

    onAddToBasket: e => {
      e.stopPropagation();
      onAddToBasket(item.code);
    },
  };

  if(isOpen) {
    return (
      <div className="Item">
        <div className="Item-code">{item.code}</div>
        <div className="Item-title">
          {item.title}
        </div>
        <div className="Item-price">
          {`${formatPrice(item.price)}`}
        </div>
        <div className="Item-count">
          {`${item.quantity} шт`}
        </div>
        <div className="Item-actions">
          <button className="btn" onClick={callbacks.onDelete}>Удалить</button>
        </div>
      </div>
    )
  }

  return (
    <div className="Item">
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">
        {item.title}
      </div>
      <div className="Item-price">
        {`${formatPrice(item.price)}`}
      </div>
      <div className="Item-actions">
        <button className="btn" onClick={callbacks.onAddToBasket}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
  onAddToBasket: PropTypes.func,
};

export default React.memo(Item);
