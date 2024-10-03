import { memo } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Header from "../../components/header";
import LocaleSelect from "../../containers/locale-select";
import Spinner from "../../components/spinner";
import useSelector from "../../hooks/use-selector";

/**
 * Главная страница - первичная загрузка каталога
 */
function Profile() {
  const store = useStore();

  useInit(
    () => {
      store.actions.profile.initParams();
    },
    [],
    true,
  );

  const select = useSelector(state => ({
    profile: state.profile.data,
    waiting: state.profile.waiting,
  }));

  const { t } = useTranslate();

  return (
    <PageLayout>
      <Header />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      {select.waiting ? <Spinner /> : <div>{JSON.stringify(select.profile)}</div>} // Временно

    </PageLayout>
  );
}

export default memo(Profile);
