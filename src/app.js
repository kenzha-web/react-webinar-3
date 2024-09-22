import React, {useCallback, useState, useEffect} from 'react';
import {formatPrice, plural} from './utils';
import BasketModal from "./components/basket-modal";
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ProductItem from "./components/product-item";
import BasketItem from "./components/basket-item";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const basket = store.getState().basket;

  const [isBasketModal, setIsBasketModal] = useState(false);

  const onCloseModal = useCallback(() => {
    setIsBasketModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsBasketModal(true);
  }, []);

  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const updateBasketInfo = () => {
      const { totalItems, totalPrice } = store.getState();

      setTotalItems(totalItems || 0);
      setTotalPrice(formatPrice(totalPrice || 0));
    };

    const unsubscribe = store.subscribe(updateBasketInfo);
    updateBasketInfo();

    return () => unsubscribe();
  }, [store]);

  const callbacks = {
    onAddItemToBasket: useCallback(
      code => {
        store.addItemToBasket(code);
      },
      [store],
    ),
    onDeleteItemToBasket: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    )
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        actions={[
          {
            key: 'basket-info',
            additionalChildren: (
              <div className="Controls-info">
                <div className="Controls-info-title">
                  В корзине:
                </div>
                <div className="Controls-info-actions">{totalItems === 0 ? `пусто` : `${totalItems} ${plural(totalItems, {
                  one: 'товар',
                  few: 'товара',
                  many: 'товаров',
                })} / ${totalPrice}`}
                </div>
              </div>
            )
          },
          {
            key: 'go-to-basket',
            text: 'Перейти',
            handler: onShowModal,
            additionalChildren: <BasketModal
              basket={basket}
              onDeleteItemToBasket={callbacks.onDeleteItemToBasket}
              isOpen={isBasketModal}
              onClose={onCloseModal}
              totalPrice={totalPrice}
            />
          },
          {
            key: 'clear-basket',
            text: 'Очистить корзину',
            handler: () => list.forEach(({code}) => callbacks.onDeleteItemToBasket(code)),
          }
        ]}
      />
      <List
        items={list}
        renderItem={(item, onItemAction) => (
          <ProductItem
            item={item}
            onAddToBasket={() => onItemAction(item.code)}
          />
        )}
        onItemAction={callbacks.onAddItemToBasket}
      />
    </PageLayout>
  );
}

export default App;
