import {
  ARTICLE_ADD_COMMENT_ADD_SUCCESS,
  ARTICLE_ADD_COMMENT_LOAD_ERROR,
  ARTICLE_ADD_COMMENT_LOAD_START,
  ARTICLE_COMMENTS_LOAD_ERROR,
  ARTICLE_COMMENTS_LOAD_START,
  ARTICLE_COMMENTS_LOAD_SUCCESS,
  ARTICLE_LOAD_ERROR,
  ARTICLE_LOAD_START,
  ARTICLE_LOAD_SUCCESS
} from "../../utils/constants";

export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: ARTICLE_LOAD_START });

      try {
        const res = await services.api.request({
          url: `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
        });
        // Товар загружен успешно
        dispatch({ type: ARTICLE_LOAD_SUCCESS, payload: { data: res.data.result } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: ARTICLE_LOAD_ERROR });
      }
    };
  },

  commentsLoad: id => {
    return async (dispatch, getState, services) => {
      dispatch({ type: ARTICLE_COMMENTS_LOAD_START });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,_type,text,dateCreate,author(profile(name)),parent(${id},_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        dispatch({ type: ARTICLE_COMMENTS_LOAD_SUCCESS, payload: { data: res.data.result.items } });
      } catch (e) {
        dispatch({ type: ARTICLE_COMMENTS_LOAD_ERROR });
      }
    };
  },

  addComment: ({ parentId = null, text, type }) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: ARTICLE_ADD_COMMENT_LOAD_START });

      try {
        const res = await services.api.request({
          method: "POST",
          url: `api/v1/comments?fields=_id,_type,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ parent: {_id: parentId, _type: type}, text }),
        });
        dispatch({ type: ARTICLE_ADD_COMMENT_ADD_SUCCESS, payload: { data: res.data.result } });
      } catch (e) {
        dispatch({ type: ARTICLE_ADD_COMMENT_LOAD_ERROR });
      }
    };
  },
};
