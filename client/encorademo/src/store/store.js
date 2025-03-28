import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import { FETCH_POSTS, fetchPostsSuccess } from "./actions";

export function* fetchPostsSaga(action) {
  try {
    const { page, title } = action;
    const queryParams = new URLSearchParams({ page, limit: 10 });
    if (title) queryParams.append("title", title);

    const response = yield call(
      axios.get,
      `http://localhost:8000/api/posts?${queryParams}`
    );

    yield put(fetchPostsSuccess(response.data));
  } catch (error) {
    console.error("Failed to fetch posts", error);
  }
}

export default function* rootSaga() {
  yield takeLatest(FETCH_POSTS, fetchPostsSaga);
}
