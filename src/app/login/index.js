import { memo, useCallback, useMemo } from 'react';
import {NavLink, useParams} from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import LoginForm from "../../components/login-form";
import Header from "../../components/header";


/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function LoginPage() {
  const store = useStore();

  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(() => {
    store.actions.profile.profileLoad(params.id);
  }, [params.id]);

  const select = useSelector(state => ({
    profile: state.profile.data,
    waiting: state.article.waiting,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  };

  const handleLogin = useCallback((credentials) => {
    store.actions.profile.login(credentials);
  }, [store]);

  return (
    <PageLayout>
      <Header />
      <Head title={"Магазин"}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm onSubmit={handleLogin} />
    </PageLayout>
  );
}

export default memo(LoginPage);
