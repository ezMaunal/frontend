import "@/styles/styles.css";
import { useState, useEffect } from "react";

import getManual from "@/api/getManual";
import BackButton from "@/sidepanel/components/BackButton";
import LoadingModal from "@/sidepanel/components/LoadingModal";
import WarningModal from "@/sidepanel/components/WarningModal";

import ManualCard from "./ManualCard";

const Repository = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [manualList, setManualList] = useState([]);

  useEffect(() => {
    const getManualList = async () => {
      setIsLoading(true);
      try {
        const response = await getManual();
        const manualData = response.data;
        setManualList(manualData);
        console.log("매뉴얼 리스트:", manualData);
      } catch (error) {
        console.error("매뉴얼 불러오기 실패:", error);
        setShowModal(true);
      } finally {
        setIsLoading(false);
      }
    };

    getManualList();
  }, []);

  return (
    <div className="main-container no-space-between relative px-2">
      {isLoading && <LoadingModal />}
      {showModal && (
        <WarningModal
          title="실패"
          message="매뉴얼을 불러오는데 실해했습니다."
          onClose={() => setShowModal(false)}
        />
      )}
      <BackButton />
      <div className="mb-6 flex justify-center">
        <span className="text-3xl font-extrabold">저장소</span>
      </div>
      {manualList.length === 0 ? (
        <div className="flex h-full items-center justify-center text-xl text-gray-400">
          캡쳐된 내용이 없습니다.
        </div>
      ) : (
        manualList.map((manual) => (
          <ManualCard
            key={manual.manualId}
            index={manual.index}
            title={manual.name}
            date={manual.createdAt}
            thumbnail={manual.thumbnail}
          />
        ))
      )}
    </div>
  );
};

export default Repository;
