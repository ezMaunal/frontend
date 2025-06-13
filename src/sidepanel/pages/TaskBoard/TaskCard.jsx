import { useState } from "react";

const TaskCard = ({ element, onTitleChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(element.textContent);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const finishEditing = () => {
    setIsEditing(false);
    if (onTitleChange) {
      onTitleChange(inputValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      finishEditing();
    }
  };

  return (
    <div onDoubleClick={handleDoubleClick}>
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
        <div className="font-bold">
          {element.textContent === ""
            ? `"여기"를 클릭해주세요!!`
            : `"${element.textContent.trim().substring(0, 13)}"를 클릭해주세요`}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
