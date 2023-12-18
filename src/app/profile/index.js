import { memo, useMemo, useCallback, useEffect } from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import ProfileTool from '../../components/profile-tool';
import ProfileCard from '../../components/profile-card';
import Spinner from "../../components/spinner";
import { useNavigate } from 'react-router-dom';

function Profile() {

    const { t } = useTranslate();
    const navigate = useNavigate();
    const store = useStore();

    useEffect(() => {
        localStorage.getItem('X-Token') ? '' : navigate('/login');
    })

    useInit(() => {
        store.actions.profile.getProfile();
    }, [], true);

    const select = useSelector(state => ({
        username: state.profile.username,
        waiting: state.profile.waiting,
        profile: {
            name: state.profile.name,
            phone: state.profile.phone,
            email: state.profile.email,
        }
    }))

    const callbacks = {
        // Выход из аккаунта
        signOut: useCallback(() => store.actions.profile.signOut(), [store]),
    }

    return (
        <PageLayout>
            <ProfileTool username={select.username} signOut={callbacks.signOut} t={t} />
            <Head title={t('title')}>
                <LocaleSelect />
            </Head>
            <Navigation />
            <Spinner active={select.waiting}>
                <ProfileCard items={select.profile} t={t} />
            </ Spinner>
        </PageLayout>
    );
}

export default memo(Profile);