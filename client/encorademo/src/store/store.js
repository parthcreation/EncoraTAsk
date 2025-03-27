import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import { FETCH_POSTS, fetchPostsSuccess } from "./actions";

export function* fetchPostsSaga(action) {
  try {
    const response = yield call(axios.get, `http://localhost:8000/api/posts?page=${action.page}`);
    yield put(fetchPostsSuccess(response.data));
  } catch (error) {
    console.error("Failed to fetch posts", error);
  }
}

export default function* rootSaga() {
  yield takeLatest(FETCH_POSTS, fetchPostsSaga);
}   