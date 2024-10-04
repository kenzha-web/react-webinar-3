import {memo} from 'react';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Header from "../../components/header";
import LocaleSelect from "../../containers/locale-select";
import ProfileInfo from "../../components/profile-info";
import useTranslate from "../../hooks/use-translate";

/**
 * Главная страница - первичная загрузка каталога
 */
function ProfilePage() {
  const { t } = useTranslate();

  return (
    <PageLayout>
      <Header />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileInfo />
    </PageLayout>
  );
}

export default memo(ProfilePage);
