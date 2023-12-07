import StoreModule from "../module";

class Product extends StoreModule {

  initState() {
    return {
      id: 0,
      title: 'Название товара',
      description: 'Описание товара',
      madeIn: '',
      category: '',
      edition: 0,
      price: 0
    }
  }

  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      id: id,
      title: json.result.title,
      description: json.result.description,
      madeIn:  json.result.madeIn.title,  
      category: json.result.category.title,
      edition: json.result.edition,
      price: json.result.price
    }, 'Загружены данные о товаре из АПИ');
  } 
}

export default Product;
