import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import BasketModal from "../basket-modal";
import { plural } from '../../utils';
import './style.css';

function Controls(props) {
  const { store } = props;
  const [isBasketModal, setIsBasketModal] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const onCloseModal = useCallback(() => {
    setIsBasketModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsBasketModal(true);
  }, []);

  useEffect(() => {
    const updateBasketInfo = () => {
      const basket = store.getState().basket;

      const uniqueItems = basket.length;
      const totalPrice = basket.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      setTotalItems(uniqueItems);
      setTotalPrice(totalPrice);
    };

    const unsubscribe = store.subscribe(updateBasketInfo);
    updateBasketInfo();

    return () => unsubscribe();
  }, [store]);

  return (
    <div className="Controls">
      <div className="Controls-info">
        <div className="Controls-info-title">
          В корзине:
        </div>
        <div className="Controls-info-actions">{totalItems === 0 ? `пусто` : `${totalItems} ${plural(totalItems, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })} / ${totalPrice} ₽`}</div>
      </div>
      <div className="Controls-action">
        <button className="btn" onClick={onShowModal}>Перейти</button>
      </div>
      <BasketModal store={store} isOpen={isBasketModal} onClose={onCloseModal} totalPrice={totalPrice} />
    </div>
  );
}

Controls.propTypes = {
  store: PropTypes.shape({
    getState: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
  }).isRequired,
};

export default React.memo(Controls);
