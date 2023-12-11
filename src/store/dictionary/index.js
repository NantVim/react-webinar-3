import StoreModule from "../module";
import ru from './dictionary-data/ru_Dictionary.json';
import en from './dictionary-data/en_Dictionary.json';

class Dictionary extends StoreModule {
    initState(){
        return {
            ...ru,
            langCode: 'ru'
        }
    }

    getLangCode() {
        return this.getState().langCode
    }

    changeLang(langCode) {
        switch (langCode) {
            case 'en':
                this.setState({
                    ...ru,
                    langCode: 'ru'
                });
                break;
        
            default:
                this.setState({
                    ...en,
                    langCode: 'en'
                })
                break;
        }
    }
}

export default Dictionary;