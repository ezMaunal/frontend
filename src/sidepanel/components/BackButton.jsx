import "@/styles/styles.css";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="absolute top-0 left-0 mt-2 ml-3">
      <button
        className="cursor-pointer text-3xl text-black"
        onClick={goBack}
      >
        &larr;
      </button>
    </div>
  );
};

export default BackButton;
