import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  setSelectedPost,
  updatePost,
  setPage,
} from "../store/actions";
import {
  PencilSquareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import EditPostModal from "./EditPostModal";

function Post() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({ title: "", body: "" });
  const [searchQuery, setSearchQuery] = useState("");

  const { posts, selectedPost, page, total, limit } = useSelector(
    (state) => state
  );

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
    setSearchQuery("");
    dispatch(setSelectedPost(null));
  };

  const totalPages = Math.ceil(total / limit) || 1;

  const isFormDirty =
    selectedPost &&
    (form.title !== selectedPost.title || form.body !== selectedPost.body);

  const isFormFilled = form.title.trim() && form.body.trim();
  const isSaveDisabled = !isFormDirty || !isFormFilled;

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const match = posts.find((p) => p.title.toLowerCase().includes(query));
    if (match) dispatch(setSelectedPost(match));
  };

  const closeModal = () => {
    setForm({ title: "", body: "" });
    setSearchQuery("");
    dispatch(setSelectedPost(null));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-red">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-wide font-serif text-center">
        Post Manager
      </h1>

      <input
        className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
        placeholder="Search by title"
        list="titles"
        value={searchQuery}
        onChange={handleSearch}
      />

      <datalist id="titles">
        {posts.map((p) => (
          <option key={p.id} value={p.title} />
        ))}
      </datalist>
      {selectedPost && (
        <EditPostModal
          selectedPost={selectedPost}
          form={form}
          handleInputChange={handleInputChange}
          handleEdit={handleEdit}
          isSaveDisabled={isSaveDisabled}
          closeModal={closeModal}
        />
      )}
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[600px] border border-gray-300 rounded-lg overflow-hidden shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
              <th className="px-6 py-3 text-left border-b">ID</th>
              <th className="px-6 py-3 text-left border-b">Title</th>
              <th className="px-6 py-3 text-left border-b">Body</th>
              <th className="px-6 py-3 text-center border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-gray-800">{post.id}</td>
                <td className="px-6 py-4 text-gray-800">{post.title}</td>
                <td className="px-6 py-4 text-gray-600 truncate max-w-xs">
                  {post.body}
                </td>
                <td className="px-6 py-4 flex justify-center items-center">
                  <PencilSquareIcon
                    className="w-6 h-6 text-blue-600 cursor-pointer hover:text-blue-700 transition"
                    onClick={() => dispatch(setSelectedPost(post))}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center space-x-6 mt-6">
        <ChevronLeftIcon
          className={`w-8 h-8 cursor-pointer ${
            page === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-blue-600 hover:text-blue-700"
          }`}
          onClick={() => page > 1 && dispatch(setPage(Math.max(1, page - 1)))}
        />

        <span className="text-gray-800 font-medium text-lg">
          Page {page} of {totalPages}
        </span>

        <ChevronRightIcon
          className={`w-8 h-8 cursor-pointer ${
            page >= totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-blue-600 hover:text-blue-700"
          }`}
          onClick={() =>
            page < totalPages &&
            dispatch(setPage(Math.min(totalPages, page + 1)))
          }
        />
      </div>
    </div>
  );
}

export default Post;
