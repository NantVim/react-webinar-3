import { memo, useCallback } from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import ProfileTool from '../../components/profile-tool';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    name: state.profile.name,
    selctedCategory: state.category.selctedCategory
  }))

  const callbacks = {
    // Выход из аккаунта
    signOut: useCallback(() => store.actions.profile.signOut(), [store]),
  }

  useInit(() => {
    store.actions.category.initCategory();
    store.actions.catalog.initParams();
    store.actions.category.selectCategory(select.selctedCategory);
  }, [], true);

  const { t } = useTranslate();


  return (
    <PageLayout>
      <ProfileTool username={select.name} signOut={callbacks.signOut} t={t}/>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
