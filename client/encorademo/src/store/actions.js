export const FETCH_POSTS = "FETCH_POSTS";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const SET_SELECTED_POST = "SET_SELECTED_POST";
export const UPDATE_POST = "UPDATE_POST";
export const SET_PAGE = "SET_PAGE";

export const fetchPosts = (page = 1) => ({ type: FETCH_POSTS, page });
export const fetchPostsSuccess = (data) => ({ type: FETCH_POSTS_SUCCESS, data });
export const setSelectedPost = (post) => ({ type: SET_SELECTED_POST, post });
export const updatePost = (post) => ({ type: UPDATE_POST, post });
export const setPage = (page) => ({ type: SET_PAGE, page });