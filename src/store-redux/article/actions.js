import {
  ARTICLE_LOAD_START,
  ARTICLE_LOAD_SUCCESS,
  ARTICLE_LOAD_ERROR,
} from "../../utils/constants";

export default {
  load: id => {
    return async (dispatch, getState, services) => {
      dispatch({ type: ARTICLE_LOAD_START });

      try {
        const res = await services.api.request({
          url: `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
        });
        dispatch({ type: ARTICLE_LOAD_SUCCESS, payload: { data: res.data.result } });
      } catch (e) {
        dispatch({ type: ARTICLE_LOAD_ERROR });
      }
    };
  },
};

