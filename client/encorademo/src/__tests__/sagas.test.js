import { runSaga } from "redux-saga";
import axios from "axios";
import { fetchPostsSaga } from "../store/store";
import { fetchPostsSuccess } from "../store/actions";

jest.mock("axios");

test("fetchPostsSaga fetches and dispatches success", async () => {
  const dispatched = [];
  const mockResponse = { data: { posts: [{ id: 1, title: "A" }], total: 1 } };
  axios.get.mockResolvedValue(mockResponse);

  await runSaga(
    {
      dispatch: (action) => dispatched.push(action),
    },
    fetchPostsSaga,
    { page: 1 }
  ).toPromise();

  expect(dispatched[0]).toEqual(fetchPostsSuccess(mockResponse.data));
});
