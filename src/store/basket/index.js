import StoreModule from "../module";

class Basket extends StoreModule {

  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0
    }
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   */
  async addToBasket(_id, langCode) {
    let sum = 0;
    // Ищем товар в корзине, чтобы увеличить его количество
    let exist = false;
    const list = this.getState().list.map(item => {
      let result = item;
      if (item._id === _id) {
        exist = true; // Запомним, что был найден в корзине
        result = {...item, amount: item.amount + 1};
      }
      sum += result.price * result.amount;
      return result;
    });

    if (!exist) {
      // Поиск товара в каталоге, чтобы его добавить в корзину.
      // @todo В реальном приложении будет запрос к АПИ вместо поиска по состоянию.
      //const item = this.store.getState().catalog.list.find(item => item._id === _id);
      const item = await this.load(_id, langCode)
      list.push({...item, amount: 1}); // list уже новый, в него можно пушить.
      // Добавляем к сумме.
      
      sum += item.price;
    }

    this.setState({
      ...this.getState(),
      list,
      sum,
      amount: list.length
    }, 'Добавление в корзину');
  }

  // Медот не нужен если хранить state на сервере
  async updateBasket(langCode) {
    let idList = '';
    this.getState().list.map(item => idList = idList + "|" + item._id)
    const response = await fetch(`/api/v1/articles?search%5Bids%5D=${idList}&fields=items(title)&lang=${langCode}`);
    const json = await response.json();

    let newDataList = [];
    let dataList = this.getState().list;
    json.result.items.map(item => {
      let data = dataList.filter(e => e._id === item._id)[0]
      let newData = {
        ...item,
        price: data.price,
        amount: data.amount
      }
      newDataList.push(newData)
    })

    this.setState({
      list: newDataList
    })
  }

  async load(id, langCode) {
    const response = await fetch(`/api/v1/articles/${id}?fields=_id, title, price&lang=${langCode}`);
    const json = await response.json();
    return (json.result);
  }

  /**
   * Удаление товара из корзины
   * @param _id Код товара
   */
  removeFromBasket(_id) {
    let sum = 0;
    const list = this.getState().list.filter(item => {
      if (item._id === _id) return false;
      sum += item.price * item.amount;
      return true;
    });

    this.setState({
      ...this.getState(),
      list,
      sum,
      amount: list.length
    }, 'Удаление из корзины');
  }
}

export default Basket;
