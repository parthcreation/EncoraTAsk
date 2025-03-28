import React from "react";
import { render, screen } from "@testing-library/react";
import Post from "../component/Post";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("Post Component", () => {
  test("renders post content", () => {
    const store = mockStore({
      posts: [{ id: 1, title: "Test Title", body: "Test Body" }],
      selectedPost: null,
      page: 1,
      total: 1,
      limit: 10,
    });

    render(
      <Provider store={store}>
        <Post />
      </Provider>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Body")).toBeInTheDocument();
  });
});
