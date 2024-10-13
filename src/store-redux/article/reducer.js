import {
  ARTICLE_LOAD_START,
  ARTICLE_LOAD_SUCCESS,
  ARTICLE_LOAD_ERROR,
} from "../../utils/constants";

const initialState = {
  data: {},
  waiting: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ARTICLE_LOAD_START:
      return { ...state, data: {}, waiting: true };

    case ARTICLE_LOAD_SUCCESS:
      return { ...state, data: action.payload.data, waiting: false };

    case ARTICLE_LOAD_ERROR:
      return { ...state, data: {}, waiting: false };

    default:
      return state;
  }
}

export default reducer;
