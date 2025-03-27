import reducer from "../store/reducers";
import { fetchPostsSuccess, setSelectedPost, updatePost } from "../store/actions";

const initialState = {
  posts: [],
  selectedPost: null,
  total: 0,
  page: 1,
  limit: 10,
};

const mockPosts = [
  { id: 1, title: "Post One", body: "Body One" },
  { id: 2, title: "Post Two", body: "Body Two" },
];

test("should handle FETCH_POSTS_SUCCESS", () => {
  const action = fetchPostsSuccess({ posts: mockPosts, total: 2 });
  const state = reducer(initialState, action);
  expect(state.posts.length).toBe(2);
});

test("should handle SET_SELECTED_POST", () => {
  const action = setSelectedPost(mockPosts[0]);
  const state = reducer(initialState, action);
  expect(state.selectedPost.title).toBe("Post One");
});

test("should handle UPDATE_POST", () => {
  const init = { ...initialState, posts: mockPosts };
  const updatedPost = { id: 1, title: "Updated", body: "Updated Body" };
  const action = updatePost(updatedPost);
  const state = reducer(init, action);
  expect(state.posts[0].title).toBe("Updated");
});
