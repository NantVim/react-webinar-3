// Начальное состояние
export const initialState = {
    items: [],
    count: 0,
    waiting: false // признак ожидания загрузки
  }
  
  // Обработчик действий
  function reducer(state = initialState, action) {
    switch (action.type) {
      case "comments/load-start":
        return {...state, items: [], count: 0, waiting: true};
  
      case "comments/load-success":
        return {...state, items: action.payload.data.items, count: action.payload.data.count, waiting: false};
  
      case "comments/load-error":
        return {...state, items: [], count: 0, waiting: false}; //@todo текст ошибки сохранять?
  
      default:
        // Нет изменений
        return state;
    }
  }
  
  export default reducer;
  