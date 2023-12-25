export default {
    load: (id) => {
        return async (dispatch, getState, services) => {
            dispatch({ type: 'comments/load-start' });

            try {
                const res = await services.api.request({
                    url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
                });
                // Комментарии загружены успешно
                dispatch({ type: 'comments/load-success', payload: { data: res.data.result, id: id }});    

            } catch (e) {
                //Ошибка загрузки
                dispatch({ type: 'comments/load-error' });
            }
        }
    },

    sendComment: (id, type) => {
        return async (dispatch, getState, services) => {
            dispatch({ type: 'comments/send-comment-start'});
            try {
                const res = await services.api.request({
                    url: `api/v1/comments`,
                    method: 'POST',
                    body: JSON.stringify({text: getState().comments.input.value, parent: {_id: id, _type: type}})
                })
                dispatch({ type: 'comments/send-comment-end', payload: {newComment: res.data.result}});
            } catch (error) {
                //Ошибка загрузки
                dispatch({ type: 'comments/load-error' });
            }
        }
    },

    inputComment: (value) => {
        return (dispatch, getState, services) => {
            dispatch({ type: 'comments/input', payload: {value: value}});
        }
    },

    openCommentInput: id => {
        return (dispatch, getState, services) => {
            dispatch({ type: 'comments/open-input', payload: {id: id}});
        }
    }
}