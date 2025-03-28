import * as actions from "../store/actions";

test("should create fetchPosts action", () => {
  expect(actions.fetchPosts(2)).toEqual({
    type: "FETCH_POSTS",
    page: 2,
    title: "",
  });
});

test("should create updatePost action", () => {
  const post = { id: 1, title: "Hello" };
  expect(actions.updatePost(post)).toEqual({ type: "UPDATE_POST", post });
});
