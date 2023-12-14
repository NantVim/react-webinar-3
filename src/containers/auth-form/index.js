import {memo, useMemo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Form from '../../components/form';
import auth from '../../app/auth';

function AuthForm() {

    const store = useStore();

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

    const options = {
        inputs: useMemo(() => ([
          {key: 1, title: 'Логин', type: 'text', value: select.authForm.login, action:callbacks.inputLogin},
          {key: 2, title: 'Пароль', type: 'password', value: select.authForm.password, action:callbacks.inputPassword},
        ]), [])
      };
    
    return(
        <Form   items={options.inputs} 
                formData={select.authForm}
                onInput={callbacks.inputData}
                title='Вход' 
                actionTitle='Войти'
                error={select.error}
                action={callbacks.onAuth}
        />
    );
}

export default memo(AuthForm);