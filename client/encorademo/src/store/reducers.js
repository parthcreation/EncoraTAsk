import { FETCH_POSTS_SUCCESS, SET_SELECTED_POST, UPDATE_POST, SET_PAGE } from "./actions";

const initialState = {
  posts: [],
  selectedPost: null,
  total: 0,
  page: 1,
  limit: 10,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return { ...state, posts: action.data.posts, total: action.data.total };
    case SET_SELECTED_POST:
      return { ...state, selectedPost: action.post };
    case UPDATE_POST:
      const updated = state.posts.map((p) => (p.id === action.post.id ? action.post : p));
      return { ...state, posts: updated };
    case SET_PAGE:
      return { ...state, page: action.page };
    default:
      return state;
  }
}
