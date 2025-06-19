import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DeleteConfirmModal from "@/sidepanel/components/DeleteConfirmModal";
import { formatToLocalDateTime } from "@/utils/dateUtil";

const ManualCard = ({ index, title, date, thumbnail, manualId, onDelete, onUpdate }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleModify = () => {
    navigate(`/repository/manual/${manualId}`);
  };

  const handleDeleteClick = () => {
    setShowModal(true);
    setShowMenu(false);
  };

  const confirmDelete = () => {
    setShowModal(false);
    onDelete(manualId);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const handleChange = (e) => setInputValue(e.target.value);

  const finishEditing = () => {
    setIsEditing(false);
    if (inputValue.trim() && inputValue !== title) {
      onUpdate(manualId, inputValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      finishEditing();
    }
  };

  return (
    <div className="relative mb-3 w-full max-w-sm rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
      <div className="absolute -top-2 -left-2 rounded-full bg-orange-500 px-2 py-1 text-xs text-white shadow">
        #{index}
      </div>

      <div className="mb-2 flex items-center justify-between">
        {isEditing ? (
          <input
            value={inputValue}
            onChange={handleChange}
            onBlur={finishEditing}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full rounded border px-2 py-1 font-bold"
          />
        ) : (
          <div
            className="cursor-pointer text-base font-bold text-stone-800"
            onDoubleClick={() => setIsEditing(true)}
          >
            {title}
          </div>
        )}

        <div className="relative ml-2">
          <button
            className="cursor-pointer text-xl text-gray-500"
            onClick={() => setShowMenu(!showMenu)}
          >
            ⋯
          </button>

          {showMenu && (
            <div className="absolute right-0 z-10 mt-2 w-24 rounded-md border bg-white shadow-md">
              <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100">공유</button>
              <button
                className="w-full cursor-pointer px-3 py-2 text-left text-sm hover:bg-gray-100"
                onClick={handleModify}
              >
                수정
              </button>
              <button
                className="w-full px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50"
                onClick={handleDeleteClick}
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex h-36 w-full items-center justify-center rounded-md bg-gray-200 text-sm text-gray-400">
        <img
          src={thumbnail}
          alt="매뉴얼 썸네일"
          className="h-full object-contain"
        />
      </div>
      <div className="mt-2 mb-1 text-sm text-gray-500">{formatToLocalDateTime(date)}</div>

      {showModal && (
        <DeleteConfirmModal
          title="매뉴얼 삭제"
          message="해당 매뉴얼을 삭제하시겠습니까?"
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default ManualCard;
