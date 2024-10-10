export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'article/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
        });
        // Товар загружен успешно
        dispatch({ type: 'article/load-success', payload: { data: res.data.result } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'article/load-error' });
      }
    };
  },

  commentsLoad: id => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'article-comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,_type,text,dateCreate,author(profile(name)),parent(${id},_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Товар загружен успешно
        dispatch({ type: 'article-comments/load-success', payload: { data: res.data.result.items } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'article-comments/load-error' });
      }
    };
  },

  addComment: ({ parentId = null, text, type }) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'article-add-comment/load-start' });

      try {
        const res = await services.api.request({
          method: "POST",
          url: `api/v1/comments?fields=_id,_type,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ parent: {_id: parentId, _type: type}, text }),
        });
        dispatch({ type: 'article-add-comment/add-success', payload: { data: res.data.result } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'article-add-comment/load-error' });
      }
    };
  },
};
