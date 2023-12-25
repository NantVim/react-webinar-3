// Начальное состояние
export const initialState = {
    items: [],
    input: {
      commentId: '',
      value: ''
    },
    rootId: '',
    count: 0,
    waiting: false // признак ожидания загрузки
  }
  
  // Обработчик действий
  function reducer(state = initialState, action) {
    switch (action.type) {
      case "comments/load-start":
        return {...state, items: [], count: 0, waiting: true};
  
      case "comments/load-success":
        return {...state, items: action.payload.data.items, count: action.payload.data.count, input:{commentId: action.payload.id, value: ''}, rootId:action.payload.id, waiting: false};
  
      case "comments/load-error":
        return {...state, items: [], count: 0, waiting: false}; //@todo текст ошибки сохранять?

      case "comments/input":
        return {...state, input:{...state.input, value: action.payload.value}}

      case "comments/open-input":
        return {...state, input: {...state.input, commentId: action.payload.id, value: ''}}

      case "comments/send-comment-start":
        return {...state}

      case "comments/send-comment-end":
        return {...state, items: [...list], input: {...state.input, value: ''}}
  
      default:
        // Нет изменений
        return state;
    }
  }
  
  export default reducer;
  