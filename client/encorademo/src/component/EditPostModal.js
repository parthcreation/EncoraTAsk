import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function EditPostModal({
  selectedPost,
  form,
  handleInputChange,
  handleEdit,
  isSaveDisabled,
  closeModal,
}) {
  return (
    <Dialog
      open={!!selectedPost}
      onClose={closeModal}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <DialogTitle
                    as="h3"
                    className="text-2xl font-semibold text-gray-900"
                  >
                    Edit Post
                  </DialogTitle>
                  <div className="absolute top-4 right-4">
                    <XMarkIcon
                      className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700 transition"
                      onClick={closeModal}
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      name="title"
                      className="border border-gray-300 rounded px-3 py-2 mt-2 w-full"
                      value={form.title}
                      onChange={handleInputChange}
                      placeholder="Title"
                    />

                    <textarea
                      name="body"
                      className="border border-gray-300 rounded px-3 py-2 mt-2 w-full"
                      value={form.body}
                      onChange={handleInputChange}
                      placeholder="Body"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                disabled={isSaveDisabled}
                onClick={handleEdit}
                className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs sm:ml-3 sm:w-auto ${
                  isSaveDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500"
                }`}
              >
                Save
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
