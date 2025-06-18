const TaskControlBar = ({ isCapturing, onFinishClick, onPauseClick, onCleanupClick }) => {
  return (
    <div className="flex justify-around bg-orange-500 py-4 text-white">
      <div className="flex flex-col items-center">
        <button
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-2xl font-bold text-orange-500 hover:bg-gray-200 hover:text-3xl"
          onClick={onFinishClick}
        >
          ✓
        </button>
        <span className="mt-1 text-sm">캡쳐완료</span>
      </div>

      <div className="flex flex-col items-center">
        <button
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-2xl font-bold text-orange-500 hover:bg-gray-200 hover:text-3xl"
          onClick={onPauseClick}
        >
          {isCapturing ? "ǁ" : <div className="ml-[2px]">▶</div>}
        </button>
        <span className="mt-1 text-sm">{isCapturing ? "일시중지" : "캡쳐 계속진행"}</span>
      </div>

      <div className="flex flex-col items-center">
        <button
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-2xl font-bold text-orange-500 hover:bg-gray-200 hover:text-3xl"
          onClick={onCleanupClick}
        >
          ✕
        </button>
        <span className="mt-1 text-sm">끄기</span>
      </div>
    </div>
  );
};

export default TaskControlBar;
