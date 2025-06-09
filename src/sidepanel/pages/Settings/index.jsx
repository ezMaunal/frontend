import "@/styles/styles.css";
import BackButton from "@/sidepanel/components/BackButton";

const Settings = () => {
  return (
    <div className="main-container">
      <BackButton />
      <div className="mt-10 mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-stone-900">설 정</h1>
      </div>

      <div className="flex flex-col items-center justify-between space-y-4">
        <button className="mt-17 w-48 rounded-2xl bg-orange-500 py-5 text-lg font-bold text-white hover:bg-orange-600">
          옵션
        </button>
        <button className="mt-12 w-48 rounded-2xl bg-orange-500 py-5 text-lg font-bold text-white hover:bg-orange-600">
          회원탈퇴
        </button>
      </div>
    </div>
  );
};

export default Settings;
