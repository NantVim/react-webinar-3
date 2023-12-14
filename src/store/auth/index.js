import authForm from "../../containers/auth-form";
import StoreModule from "../module";

class AuthState extends StoreModule {
    initState() {
        return {
            authForm: {
                login: '',
                password: ''
            },
            login: '',
            authToken: '',
            error: '',
            user: ''
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
                password: updatePassword,
            }
        })
    }

    async login() {
        console.log(this.getState().authForm)
        try {
            const response = await fetch(`/api/v1/users/sign`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify(this.getState().authForm)
            });

            const json = await response.json();
            json.error ? this.setState({...this.getState(), error: json.error.message}) : '';

            this.setState({
                ...this.getState(),
                authToken: json.response.token,
                user: json.response.user
            })

            console.log(json)
        } catch (error) {
            
        }
    }
}

export default AuthState;