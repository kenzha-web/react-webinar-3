// Начальное состояние
export const initialState = {
  data: {},
  waiting: false, // признак ожидания загрузки
  comments: [],
  commentsMap: {}
};

// Обработчик действий
function reducer(state = initialState, action) {

  switch (action.type) {
    case 'article/load-start':
      return { ...state, data: {}, waiting: true };

    case 'article/load-success':
      return { ...state, data: action.payload.data, waiting: false };

    case 'article/load-error':
      return { ...state, data: {}, waiting: false }; //@todo текст ошибки сохранять?

    case 'article-comments/load-start':
      return { ...state, comments: [], waiting: true };

    case 'article-comments/load-success':
      const commentsIerarchy2 = action.payload.data.reduce((acc, comment) => {
        acc[comment._id] ??= {children: [], ...comment};

        if (comment.parent._id in acc) {
          acc[comment.parent._id].children.push(acc[comment._id]);
        }

        return acc;
      }, {});

      return { ...state, commentsMap: commentsIerarchy2, comments: action.payload.data.filter(c => c.parent._id === state.data._id), waiting: false };

    case 'article-comments/load-error':
      return { ...state, comments: [], waiting: false }; //@todo текст ошибки сохранять?

    case 'article-add-comments/load-start':
      return { ...state, comments: [], waiting: true };

    case 'article-add-comment/add-success':
      const parentId = action.payload.data.parent._id;
      const parent = state.commentsMap[parentId]
      state.commentsMap[action.payload.data._id] ??= {...action.payload.data, children: []};
      const item = state.commentsMap[action.payload.data._id];

      if (parent != null) {
        state.commentsMap[parentId] = {...parent, children: [...parent.children, item]}
      }

      console.log({parentId, parent, item})
      return {
        ...state,
        commentsMap: {...state.commentsMap},
        comments: action.payload.data.parent._id === state.data._id ? [...state.comments, item] : state.comments,
        waiting: false
      }

    case 'article-add-comments/load-error':
      return { ...state, comments: [], waiting: false }; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
