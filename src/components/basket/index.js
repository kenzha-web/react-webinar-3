import Head from "../head";
import React, {useState, useEffect, memo, useCallback } from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import './styles.css'
import List from "../list";

const cn = bem('Basket');

const Basket = memo((props) => {
  const {
    store,
    totalPrice
  } = props;

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
      <Head
        className={cn('head')}
        title="Корзина"
      />
      <List list={basket} onDeleteItemToBasket={callbacks.onDeleteItem}/>
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
  store: PropTypes.shape({
    getState: PropTypes.func,
    subscribe: PropTypes.func,
    deleteItem: PropTypes.func,
  }).isRequired,
  totalPrice: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default Basket;
