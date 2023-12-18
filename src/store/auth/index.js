import StoreModule from "../module";

class AuthState extends StoreModule {
    initState() {
        return {
            authForm: {
                login: '',
                password: ''
            }
        }
    }

    inputlogin(updateLogin) {
        this.setState({
            ...this.getState(),
            authForm: {
                login: updateLogin,
                password: this.getState().authForm.password
            }
        })
    }

    inputPassword(updatePassword) {
        this.setState({
            ...this.getState(),
            authForm: {
                login: this.getState().authForm.login,
                password: updatePassword
            }
        })
    }

    async login() {
        const response = await fetch(`/api/v1/users/sign`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(this.getState().authForm)
        });

        const json = await response.json();
        json.error ? this.setState({ ...this.getState(), error: json.error.data.issues[0].message }) : '';

        if (json.result) {
            localStorage.setItem('X-Token', json.result.token);
            this.setState({
                authForm: {
                    login: '',
                    password: ''
                }
            })
        }
    }

    wipeData() {
        this.setState({
            authForm:{
                ...this.getState().authForm
            }
        })
    }
}

export default AuthState;