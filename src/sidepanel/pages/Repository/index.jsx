import "@/styles/styles.css";
import { useState } from "react";

import BackButton from "@/sidepanel/components/BackButton";

const Repository = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="main-container no-space-between relative px-2">
      <BackButton />
      <div className="mb-6 flex justify-center">
        <span className="text-3xl font-extrabold">저장소</span>
      </div>

      <div className="relative w-full max-w-sm rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
        <div className="absolute -top-2 -left-2 rounded-full bg-orange-500 px-2 py-1 text-xs text-white shadow">
          #1
        </div>

        <div className="mb-2 flex items-center justify-between">
          <div className="font-bold text-stone-800">매뉴얼 제목 1</div>
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
                <button className="s w-full px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50">
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mb-3 text-sm text-gray-500">2025-04-29</div>

        <div className="flex h-36 w-full items-center justify-center rounded-md bg-gray-200 text-sm text-gray-400">
          썸네일 이미지
        </div>
      </div>
    </div>
  );
};

export default Repository;
