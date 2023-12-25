import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import ProfileTool from '../../components/profile-tool';
import AuthForm from '../../containers/auth-form';

/**
 * Стрыница авторизации
 */
function Auth() {

  const store = useStore();

  const select = useSelector(state => ({
    name: state.profile.name
  }))

  const callbacks = {
    // Выход из аккаунта
    signOut: useCallback(() => store.actions.profile.signOut(), [store]),
  }

  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);

  const {t} = useTranslate();

  return (
    <PageLayout>
      <ProfileTool username={select.name} signOut={callbacks.signOut} t={t}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <AuthForm />
    </PageLayout>
  );
}

export default memo(Auth);
