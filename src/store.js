import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */

  addItem(code) {
    let newItem = this.state.list.find(item => item.code === code);
    let isCopy;
    let updateItems = this.state.cart.items.map(item => {
      if (item.code === code) {
        isCopy = item;
        return {
          ...item,
          count: item.count + 1
        }
      }

      return item;
    })

    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        items: isCopy ? updateItems : [...updateItems,{...newItem, count: 1}],
        value: this.state.cart.value + newItem.price,
        itemCount: isCopy ? this.state.cart.itemCount : this.state.cart.itemCount + 1
      },
    })
  }

  /**
   * Удаление товара по коду
   * @param code
   */
  deleteItem(code) {
    let item = this.state.cart.items.find(item => item.code === code);
    let deleteItem = this.state.cart.items.filter(item => item.code !== code);

    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        items: deleteItem,
        value: this.state.cart.value - item.price * item.count,
        itemCount: this.state.cart.itemCount - 1
      }
    });
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? { ...item, selected: false } : item;
      })
    })
  }

  switchCart() {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        isOpen: !this.state.cart.isOpen 
      }
    });
  }
}

export default Store;
