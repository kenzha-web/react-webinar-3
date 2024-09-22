import Head from "../head";
import React, {useState, useEffect, memo, useCallback } from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import './styles.css'
import List from "../list";
import BasketItem from "../basket-item";

const cn = bem('Basket');

const Basket = memo((props) => {
  const {
    basket,
    onDeleteItemToBasket,
    totalPrice
  } = props;

  return (
    <div className={cn()}>
      <Head
        className={cn('head')}
        title="Корзина"
      />
      <List
        items={basket}
        renderItem={(item, onItemAction) => (
          <BasketItem
            item={item}
            onDelete={() => onItemAction(item.code)}
          />
        )}
        onItemAction={onDeleteItemToBasket}
      />
      <div className={cn('total')}>
        <div className={cn('total-text')}>Итого</div>
        <div className={cn('total-price')}>
          {totalPrice}
        </div>
      </div>
    </div>
  )
})

Basket.propTypes = {
  basket: PropTypes.array,
  onDeleteItemToBasket: PropTypes.func,
  totalPrice: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default Basket;
