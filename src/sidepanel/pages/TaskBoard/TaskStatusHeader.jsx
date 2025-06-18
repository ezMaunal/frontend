const TaskStatusHeader = ({ isCapturing }) => {
  return (
    <div className="flex justify-around bg-orange-500 py-3 text-white">
      <div className="flex flex-col items-center">
        {isCapturing ? (
          <div className="flex items-center justify-center">
            <div className="flex h-10 w-10 items-center justify-center bg-white">
              <div className="flex h-5 w-5 animate-pulse rounded-full bg-orange-500" />
            </div>
            <div className="ml-3 flex animate-pulse text-2xl text-white">캡쳐중...</div>
          </div>
        ) : (
          <div className="ml-3 flex text-2xl text-white">캡쳐 일시중단</div>
        )}
      </div>
    </div>
  );
};

export default TaskStatusHeader;
