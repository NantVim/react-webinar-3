import StoreModule from "../module";
import { sortCategory } from '../../utils';

class Category extends StoreModule {
    initState() {
        return {
            categoryList: []
        }
    }

    async initCategory() {
        let selectedCategory = 'all';
        const urlParams = new URLSearchParams(window.location.search);

        urlParams.has('category') ? selectedCategory = urlParams.get('category') : '';

        // Получение списка категорий
        const categoryListResponse = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
        const categoryJson = await categoryListResponse.json();

        let categoryList = categoryJson.result.items;
        let sortCategorylist = [];

        categoryList.map(item => {
            if (!item.parent) {
                sortCategorylist.push({
                    value: item._id,
                    title: item.title
                })
                sortCategory(categoryList, sortCategorylist, item._id, 1)
            }
            return sortCategorylist
        })

        this.setState({
            ...this.getState(),
            categoryList: [
                {
                    value: 'all',
                    title: 'Все'
                },
                ...sortCategorylist
            ],
            selctedCategory: selectedCategory.value
        }, 'Загружен список категорий из АПИ');
    }

    selectCategory(category) {
        this.setState({
            ...this.getState(),
            selctedCategory: category
        })
    }
}

export default Category;