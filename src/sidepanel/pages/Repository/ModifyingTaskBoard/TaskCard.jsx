import { useState } from "react";

import DeleteConfirmModal from "@/sidepanel/components/DeleteConfirmModal";

const TaskCard = ({ index, imageId, image, text, onChangeText, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(text || "");
  const [showModal, setShowModal] = useState(false);

  const finishEditing = () => {
    setIsEditing(false);
    if (inputValue.trim() !== text) {
      onChangeText(imageId, inputValue.trim());
    }
  };

  const handleConfirmDelete = () => {
    onDelete(imageId);
    setShowModal(false);
  };

  const handleDoubleClick = () => setIsEditing(true);
  const handleChange = (e) => setInputValue(e.target.value);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") finishEditing();
  };
  const handleDeleteClick = () => setShowModal(true);
  const handleCancelDelete = () => setShowModal(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between rounded-md bg-gray-200 px-3 py-2">
        <div className="flex items-center space-x-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
            {index + 1}
          </div>
          {isEditing ? (
            <input
              value={inputValue}
              onChange={handleChange}
              onBlur={finishEditing}
              onKeyDown={handleKeyDown}
              autoFocus
              className="rounded border px-1 font-bold"
            />
          ) : (
            <div
              className="cursor-pointer font-bold"
              onDoubleClick={handleDoubleClick}
            >
              {inputValue || `"여기"를 클릭해주세요!!`}
            </div>
          )}
        </div>
        <button
          className="cursor-pointer transition-all duration-200 hover:text-2xl"
          onClick={handleDeleteClick}
        >
          🗑️
        </button>
      </div>

      <div className="flex h-32 items-center justify-center rounded-md bg-gray-300 text-gray-600">
        <img
          src={image}
          alt={`screenshot-${index}`}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {showModal && (
        <DeleteConfirmModal
          title="캡처 이미지 삭제"
          message="해당 단계를 삭제하시겠습니까?"
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default TaskCard;
