import {memo, useMemo, useCallback, useEffect} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";
import Form from '../../components/form';
import useTranslate from "../../hooks/use-translate";

function AuthForm() {

    const store = useStore();

    const navigate = useNavigate()

    useEffect(() => {
        store.actions.auth.wipeData();
    }, [])

    useEffect(() => {
        localStorage.getItem('X-Token') ? navigate('/profile') : ''
    })
    

    const select = useSelector(state => ({
        authForm: state.auth.authForm,
        error: state.auth.error
    }))

    const callbacks = {
        // Авторизация
        onAuth: useCallback(() => store.actions.auth.login(), []),
        // Ввод логина
        inputLogin: useCallback (value => store.actions.auth.inputlogin(value), [store]),
        // Ввод пароля
        inputPassword: useCallback (value => store.actions.auth.inputPassword(value), [store]),
    }

    const { t } = useTranslate();

    const options = {
        inputs: useMemo(() => ([
          {key: 1, title: t('auth.login'), type: 'text', value: select.authForm.login, action:callbacks.inputLogin},
          {key: 2, title: t('auth.pass'), type: 'password', value: select.authForm.password, action:callbacks.inputPassword},
        ]), [])
      };
    

    return(
        <Form   items={options.inputs} 
                formData={select.authForm}
                onInput={callbacks.inputData}
                title={t('auth.title')} 
                actionTitle={t('auth.action')}
                error={select.error}
                action={callbacks.onAuth}
        />
    );
}

export default memo(AuthForm);