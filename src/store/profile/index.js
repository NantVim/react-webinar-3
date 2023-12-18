import StoreModule from "../module";

class ProfileState extends StoreModule {
    initState() {
        return {
            username: '',
            name: '',
            phone: '',
            email: '',
            waiting: true
        }
    }

    async getProfile() {
        try {
            const response = await fetch(`/api/v1/users/self?fields=*`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'X-Token': localStorage.getItem('X-Token')
                }
            });
            const json = await response.json();

            this.setState({
                ...this.getState(),
                profile: json.result,
                name: json.result.profile.name,
                phone: json.result.profile.phone,
                email: json.result.email,
                username: json.result.username,
                waiting: false
            })
        } catch (error) {
        }
    }

    async authCheck() {
        try {
            const response = await fetch(`/api/v1/users/self?fields=username`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'X-Token': localStorage.getItem('X-Token')
                }
            });
            const json = await response.json();

            this.setState({
                ...this.getState(),
                username: json.result.username,
                isLogin: true
            })
        } catch (error) {
        }
    }

    async signOut() {
        try {
            const response = await fetch(`/api/v1/users/sign`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'X-Token': localStorage.getItem('X-Token')
                }
            });

            const json = await response.json();

            localStorage.removeItem('X-Token');

            this.setState({
                username: '',
                name: '',
                phone: '',
                email: '',
                isLogin: false
            })
        } catch (error) {
        }
    }
}

export default ProfileState;