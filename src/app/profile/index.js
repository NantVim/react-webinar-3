import { memo, useMemo } from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import Usertool from '../../components/user-tool';
import ProfileCard from '../../components/profile-card';

function Profile() {

    const { t } = useTranslate();

    const store = useStore();

    const select = useSelector(state => ({
        name: state.auth.user,
        phone: state.auth.user,
        email: state.auth.user,
    }))

    const options = {
        profileItems: useMemo(() => ([
            {key: 'name', title: 'Имя: ', value: 'test'},
            {key: 'phone', title: 'Телефон: ', value: 'test'},
            {key: 'email', title: 'email: ', value: 'test'},
        ]), [])
    };

    return (
        <PageLayout>
            <Usertool />
            <Head title={t('title')}>
                <LocaleSelect />
            </Head>
            <Navigation />
            <ProfileCard items={options.profileItems} />
        </PageLayout>
    );
}

export default memo(Profile);