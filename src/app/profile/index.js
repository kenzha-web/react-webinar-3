import {memo} from 'react';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Header from "../../components/header";
import LocaleSelect from "../../containers/locale-select";
import ProfileInfo from "../../components/profile-info";
import useTranslate from "../../hooks/use-translate";
import useSession from "../../hooks/use-session";

/**
 * Главная страница - первичная загрузка каталога
 */
function ProfilePage() {
  const { user } = useSession();
  const { t } = useTranslate();

  return (
    <PageLayout>
      <Header
        loginLabel={t('header.login')}
        logoutLabel={t('header.logout')}
        user={user}
      />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileInfo />
    </PageLayout>
  );
}

export default memo(ProfilePage);
