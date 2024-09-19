import React, {useCallback, useState} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

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
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls store={store}/>
      <List
        list={list}
        onAddItemToBasket={callbacks.onAddItemToBasket}
        onDeleteItemToBasket={callbacks.onDeleteItemToBasket}
      />
    </PageLayout>
  );
}

export default App;
