import { memo, useCallback, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ProductInfo from "../../components/product-info";
import {useParams} from "react-router-dom";
import Menu from "../../components/menu";

function Product() {
  const store = useStore();
  const { id } = useParams();

  const select = useSelector(state => ({
    product: state.product,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    store.actions.product.productLoad(id);

  }, [id]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(item => store.actions.basket.addToBasket(item), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    changeId: useCallback((_id) => store.actions.product.changeId(_id), [store])
  };

  return (
    <PageLayout>
      <Head title={select.product.title} />
      <Menu />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <ProductInfo
        product={select.product}
        onAdd={callbacks.addToBasket}
      />
    </PageLayout>
  );
}

export default memo(Product);
