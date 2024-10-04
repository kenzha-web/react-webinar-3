import {memo, useCallback, useEffect, useMemo} from 'react';
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import LoginForm from "../../components/login-form";
import Header from "../../components/header";

/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function LoginPage() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    token: state.profile.token,
  }));

  useEffect(() => {
    if (select.token) {
      navigate('/profile');
    }
  }, [select.token]);

  const { t } = useTranslate();

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
