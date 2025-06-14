import trashIcon from "@/assets/trash-icon.svg";

const DeleteConfirmModal = ({ title, message, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center space-x-2">
          <img
            src={trashIcon}
            alt="삭제 아이콘"
            className="h-6 w-6"
          />
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>

        <p className="mt-2 text-sm text-gray-600">{message}</p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-500"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
