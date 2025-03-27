import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  setSelectedPost,
  updatePost,
  setPage,
} from "../store/actions";

function Post() {
  const dispatch = useDispatch();
  const { posts, selectedPost, page, total, limit } = useSelector(
    (state) => state
  );
  const [form, setForm] = useState({ title: "", body: "" });

  useEffect(() => {
    dispatch(fetchPosts(page));
  }, [dispatch, page]);

  useEffect(() => {
    if (selectedPost) {
      setForm({ title: selectedPost.title, body: selectedPost.body });
    }
  }, [selectedPost]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "title") {
      const match = posts.find((p) => p.title === value);
      if (match) dispatch(setSelectedPost(match));
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(updatePost({ ...selectedPost, ...form }));
  };

  const totalPages = Math.ceil(total / limit) || 1;

  const isFormDirty =
    selectedPost &&
    (form.title !== selectedPost.title || form.body !== selectedPost.body);

  const isFormFilled = form.title.trim() && form.body.trim();
  const isSaveDisabled = !isFormDirty || !isFormFilled;

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const match = posts.find((p) => p.title.toLowerCase().includes(query));
    if (match) dispatch(setSelectedPost(match));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Post Manager</h1>

      <input
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
        placeholder="Search by title"
        list="titles"
        onChange={handleSearch}
      />
      <datalist id="titles">
        {posts.map((p) => (
          <option key={p.id} value={p.title} />
        ))}
      </datalist>

      {selectedPost && (
        <form
          onSubmit={handleEdit}
          className="bg-gray-100 p-4 mb-6 rounded shadow"
        >
          <h2 className="text-lg font-semibold mb-3">Edit Post</h2>
          <input
            name="title"
            className="border border-gray-300 rounded px-3 py-2 mb-3 w-full"
            value={form.title}
            onChange={handleInputChange}
            placeholder="Title"
          />
          <textarea
            name="body"
            className="border border-gray-300 rounded px-3 py-2 mb-3 w-full"
            value={form.body}
            onChange={handleInputChange}
            placeholder="Body"
          />
          <button
            type="submit"
            disabled={isSaveDisabled}
            className={`px-4 py-2 rounded text-white ${
              isSaveDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Save
          </button>
        </form>
      )}

      <table className="w-full table-auto border-collapse mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Body</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{post.id}</td>
              <td className="border px-4 py-2">{post.title}</td>
              <td className="border px-4 py-2">{post.body}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  onClick={() => dispatch(setSelectedPost(post))}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-4">
        <button
          className={`px-4 py-2 rounded ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
          onClick={() => dispatch(setPage(Math.max(1, page - 1)))}
          disabled={page === 1}
        >
          Prev
        </button>

        <span className="text-gray-700">
          Page {page} of {totalPages}
        </span>

        <button
          className={`px-4 py-2 rounded ${
            page >= totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
          onClick={() => dispatch(setPage(Math.min(totalPages, page + 1)))}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Post;
