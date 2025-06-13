import { useState } from "react";

const TaskCard = ({ index, element, image, onTitleChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(element.textContent);

  const handleDoubleClick = () => setIsEditing(true);
  const handleChange = (e) => setInputValue(e.target.value);

  const finishEditing = () => {
    setIsEditing(false);
    onTitleChange?.(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") finishEditing();
  };

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
              {inputValue?.trim().substring(0, 13) || '"여기"를 클릭해주세요!!'}
            </div>
          )}
        </div>
      </div>

      <div className="flex h-32 items-center justify-center rounded-md bg-gray-300 text-gray-600">
        <img
          src={image}
          className="max-h-full max-w-full object-contain"
        />
      </div>
    </div>
  );
};

export default TaskCard;
