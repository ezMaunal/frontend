import "@/styles/styles.css";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/taskboard");
  };

  const handleClose = () => {
    window.close();
  };

  return (
    <div className="main-container">
      <div className="flex w-full max-w-md flex-row justify-center gap-x-4 px-4">
        <button className="btn-orange">저장소</button>
        <button
          className="btn-orange"
          onClick={() => navigate("/settings")}
        >
          설정
        </button>
      </div>

      <div className="mt-16 w-full max-w-md px-4 text-center">
        <p className="mb-2 text-lg text-stone-950">쉬운 사용자 매뉴얼 생성기</p>
        <h1 className="text-6xl font-extrabold text-black">ezManual</h1>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <button
          className="mb-4 cursor-pointer items-center rounded-2xl bg-orange-500 px-10 py-4 text-white hover:bg-orange-600"
          onClick={() => handleStartClick()}
        >
          <p className="mb-1 text-xl">매뉴얼 만들기</p>
          <p className="w-48 text-center text-2xl font-bold">START</p>
        </button>
        <button
          className="w-48 cursor-pointer rounded-2xl bg-gray-700 px-10 py-4 text-center text-2xl font-bold text-white hover:bg-gray-800"
          onClick={handleClose}
        >
          종 료
        </button>
      </div>
    </div>
  );
};

export default MainPage;
