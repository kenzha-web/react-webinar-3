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

// Начальное состояние
export const initialState = {
  data: {},
  waiting: false, // признак ожидания загрузки
  comments: [],
  commentsMap: {}
};

// Обработчик действий
function reducer(state = initialState, action) {

  console.log({action})

  switch (action.type) {
    case ARTICLE_LOAD_START:
      return { ...state, data: {}, waiting: true };

    case ARTICLE_LOAD_SUCCESS:
      return { ...state, data: action.payload.data, waiting: false };

    case ARTICLE_LOAD_ERROR:
      return { ...state, data: {}, waiting: false }; //@todo текст ошибки сохранять?

    case ARTICLE_COMMENTS_LOAD_START:
      return { ...state, comments: [], waiting: true };

    case ARTICLE_COMMENTS_LOAD_SUCCESS:
      const commentsIerarchy2 = action.payload.data.reduce((acc, comment) => {
        acc[comment._id] ??= {children: [], childrenCount: 0, ...comment};

        if (comment.parent._id in acc) {
          let parent = acc[comment.parent._id];
          parent.children.push(acc[comment._id]);
          parent.childrenCount++;

          while (parent.parent._id && parent.parent._id !== state.data._id) {
            parent = acc[parent.parent._id];
            if (!parent) {
              break;
            }
            parent.childrenCount++;
          }
        }

        return acc;
      }, {});

      return { ...state, commentsMap: commentsIerarchy2, comments: action.payload.data.filter(c => c.parent._id === state.data._id), waiting: false };

    case ARTICLE_COMMENTS_LOAD_ERROR:
      return { ...state, comments: [], waiting: false }; //@todo текст ошибки сохранять?

    case ARTICLE_ADD_COMMENT_LOAD_START:
      return { ...state, waiting: true };

    case ARTICLE_ADD_COMMENT_ADD_SUCCESS:
      const parentId = action.payload.data.parent._id;
      let parent = state.commentsMap[parentId]
      state.commentsMap[action.payload.data._id] ??= {...action.payload.data, children: []};
      const item = state.commentsMap[action.payload.data._id];

      if (parent != null) {
        parent.children.push(item);
        parent.childrenCount++;

        while (parent.parent._id && parent.parent._id !== state.data._id) {
          parent = state.commentsMap[parent.parent._id];
          if (!parent) {
            break;
          }
          parent.childrenCount++;
        }
      }

      console.log({parentId, parent, item})
      return {
        ...state,
        commentsMap: {...state.commentsMap},
        comments: action.payload.data.parent._id === state.data._id ? [...state.comments, item] : [...state.comments],
        waiting: false
      }

    case ARTICLE_ADD_COMMENT_LOAD_ERROR:
      return { ...state, comments: [], waiting: false }; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
