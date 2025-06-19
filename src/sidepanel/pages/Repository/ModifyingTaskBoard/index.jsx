import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import deleteManual from "@/api/deleteManual";
import deleteStepFromManual from "@/api/deleteStepFromManual";
import getManualById from "@/api/getManualById";
import updateStepText from "@/api/updateStepText";
import DeleteConfirmModal from "@/sidepanel/components/DeleteConfirmModal";

import TaskControlBar from "./TaskControlBar.jsx";
import TaskStepsRenderer from "./TaskStepsRenderer.jsx";

const ModifyingTaskboard = () => {
  const { manualId } = useParams();
  const [steps, setSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEmptyDeleteModal, setShowEmptyDeleteModal] = useState(false);
  const [pendingDeleteManualId, setPendingDeleteManualId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        setIsLoading(true);
        const { data } = await getManualById(manualId);
        setSteps(data.steps || []);
      } catch (err) {
        console.error("수정용 manual 불러오기 실패:", err);
        setShowModal(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSteps();
  }, [manualId]);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        setIsLoading(true);
        const { data } = await getManualById(manualId);
        setSteps(data.steps || []);
      } catch (err) {
        console.error("수정용 manual 불러오기 실패:", err);
        setShowModal(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSteps();
  }, [manualId]);

  steps.forEach((step, i) => {
    if (!step.elementData) {
      console.warn(`❗ step[${i}]에 elementData가 없음`, step);
    }
  });

  const handleFinishClick = async () => {
    setIsLoading(true);

    try {
      for (const step of steps) {
        const rawText = (step.text ?? step.elementData?.textContent ?? "").trim();
        const text = rawText === "" ? `"여기"를 클릭해주세요` : rawText;

        const imageId = step.imageId;
        if (!imageId) {
          console.warn("❗ imageId 없음. 건너뜀:", step);
          continue;
        }

        await updateStepText(manualId, imageId, text);
      }

      navigate("/repository");
    } catch (error) {
      console.error(" 텍스트 업데이트 실패:", error);
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDeleteEmptyManual = async () => {
    if (!pendingDeleteManualId) return;

    try {
      await deleteManual(pendingDeleteManualId);
      navigate("/repository");
    } catch (err) {
      console.error("manual 삭제 실패:", err);
    } finally {
      setShowEmptyDeleteModal(false);
    }
  };

  const handleTitleChange = async (imageId, newText) => {
    try {
      await updateStepText(manualId, imageId, newText);
      setSteps((prev) =>
        prev.map((step) => (step.imageId === imageId ? { ...step, text: newText } : step)),
      );
    } catch (err) {
      console.error("제목 수정 실패:", err);
    }
  };

  const handleDeleteStep = async (imageId) => {
    try {
      await deleteStepFromManual(manualId, imageId);

      setSteps((prevSteps) => {
        const updated = prevSteps.filter((s) => s.imageId !== imageId);

        if (updated.length === 0) {
          setPendingDeleteManualId(manualId);
          setShowEmptyDeleteModal(true);
        }
        return updated;
      });
    } catch (err) {
      console.error("삭제 실패:", err);
    }
  };

  return (
    <>
      {showEmptyDeleteModal && (
        <DeleteConfirmModal
          title="매뉴얼 삭제"
          message="캡쳐가 모두 삭제되어 매뉴얼도 함께 삭제됩니다."
          onConfirm={confirmDeleteEmptyManual}
        />
      )}

      <div className="flex min-h-screen w-full flex-col bg-white">
        {isLoading && <div className="mt-10 text-center">불러오는 중...</div>}
        {showModal && (
          <div className="mt-4 text-center text-red-500">manual을 불러오는 데 실패했습니다.</div>
        )}

        <TaskStepsRenderer
          steps={steps}
          handleDeleteStep={handleDeleteStep}
          handleTitleChange={handleTitleChange}
        />

        <TaskControlBar onFinishClick={handleFinishClick} />
      </div>
    </>
  );
};

export default ModifyingTaskboard;
