import "@/styles/styles.css";
import { useState, useEffect } from "react";

import deleteManual from "@/api/deleteManual";
import getManual from "@/api/getManual";
import updateManual from "@/api/updateManual";
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
        setManualList(response.data);
      } catch (error) {
        console.error("매뉴얼 불러오기 실패:", error);
        setShowModal(true);
      } finally {
        setIsLoading(false);
      }
    };

    getManualList();
  }, []);

  const handleDelete = async (manualId) => {
    try {
      await deleteManual(manualId);
      setManualList((prev) => prev.filter((item) => item.manualId !== manualId));
    } catch (error) {
      console.error("삭제 실패:", error);
      setShowModal(true);
    }
  };

  const handleUpdate = async (manualId, newName) => {
    try {
      await updateManual(manualId, { name: newName });
      setManualList((prev) =>
        prev.map((m) => (m.manualId === manualId ? { ...m, name: newName } : m)),
      );
    } catch (err) {
      console.error("수정 실패:", err);
    }
  };

  return (
    <div className="main-container no-space-between relative px-2">
      {isLoading && <LoadingModal />}
      {showModal && (
        <WarningModal
          title="실패"
          message="작업 도중 오류가 발생했습니다."
          onClose={() => setShowModal(false)}
        />
      )}
      <BackButton to="/" />
      <div className="mb-6 flex justify-center">
        <span className="text-3xl font-extrabold">저장소</span>
      </div>
      {manualList.length === 0 ? (
        <div className="flex h-full items-center justify-center text-xl text-gray-400">
          저장된 매뉴얼이 없습니다.
        </div>
      ) : (
        manualList.map((manual, idx) => (
          <ManualCard
            key={manual.manualId}
            index={idx + 1}
            title={manual.name}
            date={manual.createdAt}
            thumbnail={manual.thumbnail}
            manualId={manual.manualId}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))
      )}
    </div>
  );
};

export default Repository;
