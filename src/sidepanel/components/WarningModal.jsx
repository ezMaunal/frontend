import warningIcon from "@/assets/warning-icon.svg";

const WarningModal = ({ title, message, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center space-x-2">
          <img
            src={warningIcon}
            alt="삭제 아이콘"
            className="h-6 w-6"
          />
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>

        <hr class="mt-2 mb-3 border-gray-300"></hr>

        <p className="mt-2 text-lg text-gray-600">{message}</p>

        <div className="mt-6 flex justify-center">
          <button
            className="cursor-pointer rounded bg-orange-600 px-4 py-1 text-lg text-white hover:bg-orange-700 focus:outline-none"
            onClick={onClose}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
