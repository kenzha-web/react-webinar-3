import React, { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Paginator from "../../components/paginator";
import Menu from "../../components/menu";

function Main() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    totalItemsCount: state.catalog.totalItemsCount,
    page: state.catalog.page,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    store.actions.catalog.load(select.page);

  }, [select.page]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(item => store.actions.basket.addToBasket(item), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    changePage: useCallback((page) => store.actions.catalog.changePage(page), [store])
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item
          item={item}
          onAdd={callbacks.addToBasket}
          link={`/product/${item._id}`}
        />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <main style={{display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1, paddingBottom: '20px'}}>
        <Head title="Магазин" />
        <Menu />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
        <List list={select.list} renderItem={renders.item} />
        <Paginator
          totalItemsCount={select.totalItemsCount}
          pageSize={10}
          currentPage={select.page}
          onChangePage={callbacks.changePage}
        />
      </main>
    </PageLayout>
  );
}

export default memo(Main);
