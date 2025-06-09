const TaskBoard = () => {
  const items = [{ id: 1, title: "제목(1)", image: "캡쳐사진" }];

  return (
    <div className="flex h-screen flex-col bg-white">
      <div className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="space-y-2"
          >
            <div className="flex items-center justify-between rounded-md bg-gray-200 px-3 py-2">
              <div className="flex items-center space-x-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                  {index + 1}
                </div>
                <div className="font-bold">{item.title} ⋯</div>
              </div>
              <button className="text-lg text-red-500">⋯</button>
            </div>
            <div className="flex h-32 items-center justify-center rounded-md bg-gray-300 text-gray-600">
              {item.image}
            </div>
            {index !== items.length - 1 && (
              <div className="flex justify-center text-2xl text-gray-400">↓</div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-around bg-orange-500 py-4 text-white">
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl font-bold text-orange-500">
            ✓
          </div>
          <span className="mt-1 text-sm">캡쳐완료</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl font-bold text-orange-500">
            Ⅱ
          </div>
          <span className="mt-1 text-sm">일시중지</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl font-bold text-orange-500">
            ✕
          </div>
          <span className="mt-1 text-sm">끄기</span>
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
