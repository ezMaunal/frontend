import { useState } from "react";

const ManualCard = ({ index, title, date, thumbnail }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative w-full max-w-sm rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
      <div className="absolute -top-2 -left-2 rounded-full bg-orange-500 px-2 py-1 text-xs text-white shadow">
        #{index}
      </div>

      <div className="mb-2 flex items-center justify-between">
        <div className="font-bold text-stone-800">{title}</div>
        <div className="relative">
          <button
            className="cursor-pointer text-xl text-gray-500"
            onClick={() => setShowMenu(!showMenu)}
          >
            ⋯
          </button>
          {showMenu && (
            <div className="absolute right-0 z-10 mt-2 w-24 rounded-md border bg-white shadow-md">
              <button className="w-full cursor-pointer px-3 py-2 text-left text-sm hover:bg-gray-100">
                공유
              </button>
              <button className="w-full cursor-pointer px-3 py-2 text-left text-sm hover:bg-gray-100">
                수정
              </button>
              <button className="w-full px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50">
                삭제
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mb-3 text-sm text-gray-500">{date}</div>

      <div className="flex h-36 w-full items-center justify-center rounded-md bg-gray-200 text-sm text-gray-400">
        <img
          src={thumbnail}
          alt="매뉴얼 썸네일"
          className="h-full object-contain"
        />
      </div>
    </div>
  );
};

export default ManualCard;
