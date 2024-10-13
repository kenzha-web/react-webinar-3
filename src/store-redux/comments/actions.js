import {
  COMMENTS_LOAD_START,
  COMMENTS_LOAD_SUCCESS,
  COMMENTS_LOAD_ERROR,
  ADD_COMMENT_START,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_ERROR,
} from "../../utils/constants";

export default {
  load: (parentId) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: COMMENTS_LOAD_START });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted)&limit=*&search[parent]=${parentId}`,
        });
        dispatch({ type: COMMENTS_LOAD_SUCCESS, payload: { data: res.data.result.items } });
      } catch (e) {
        dispatch({ type: COMMENTS_LOAD_ERROR });
      }
    };
  },

  addComment: ({ parentId = null, text, type }) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: ADD_COMMENT_START });

      try {
        const res = await services.api.request({
          method: "POST",
          url: `/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type)`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ parent: { _id: parentId, _type: type }, text }),
        });
        dispatch({ type: ADD_COMMENT_SUCCESS, payload: { data: res.data.result } });
      } catch (e) {
        dispatch({ type: ADD_COMMENT_ERROR });
      }
    };
  },
};
