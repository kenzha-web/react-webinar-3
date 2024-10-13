import {
  COMMENTS_LOAD_START,
  COMMENTS_LOAD_SUCCESS,
  COMMENTS_LOAD_ERROR,
  ADD_COMMENT_START,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_ERROR,
} from "../../utils/constants";

const initialState = {
  comments: [],
  waiting: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case COMMENTS_LOAD_START:
      return { ...state, comments: [], waiting: true };

    case COMMENTS_LOAD_SUCCESS:
      return { ...state, comments: action.payload.data, waiting: false };

    case COMMENTS_LOAD_ERROR:
      return { ...state, comments: [], waiting: false };

    case ADD_COMMENT_START:
      return { ...state, waiting: true };

    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, action.payload.data],
        waiting: false,
      };

    case ADD_COMMENT_ERROR:
      return { ...state, waiting: false };

    default:
      return state;
  }
}

export default reducer;
