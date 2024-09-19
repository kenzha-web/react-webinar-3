import Head from "../head";
import React, {useState, useEffect, memo, useCallback } from "react";
import BasketList from "../baket-list";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import './styles.css'

const Basket = memo((props) => {
  const {
    store,
    isOpen= false,
    totalPrice
  } = props;
  const cn = bem('Basket');
  const [basket, setBasket] = useState(store.getState().basket);

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),
  };

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setBasket(store.getState().basket);
    });

    return () => unsubscribe();
  }, [store]);

  return (
    <div className={cn()}>
      <Head className={cn('head')} title="Корзина" />
      <BasketList
        basket={basket}
        isOpen={isOpen}
        onDeleteItem={callbacks.onDeleteItem}
      />
      <div className={cn('total')}>
        <div className={cn('total-text')}>Итого</div>
        <div className={cn('total-price')}>
          {totalPrice} ₽
        </div>
      </div>
    </div>
  )
})

Basket.propTypes = {
  store: PropTypes.shape({
    getState: PropTypes.func,
    subscribe: PropTypes.func,
    deleteItem: PropTypes.func,
  }).isRequired,
  isOpen: PropTypes.bool,
  totalPrice: PropTypes.number,
};

export default Basket;
