const TaskControlBar = ({ onFinishClick }) => {
  return (
    <div className="flex justify-center bg-orange-500 py-4 text-white">
      <button
        className="flex h-12 w-28 items-center justify-center rounded-full bg-white text-sm font-bold text-orange-500 hover:bg-gray-200"
        onClick={onFinishClick}
      >
        수정 완료
      </button>
    </div>
  );
};

export default TaskControlBar;
