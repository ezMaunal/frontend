import "@/styles/styles.css";
import { useNavigate } from "react-router-dom";

const BackButton = ({ to }) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="absolute top-0 left-0 mt-2 ml-3">
      <button
        className="cursor-pointer text-3xl text-black"
        onClick={goBack}
        aria-label="뒤로가기"
      >
        &larr;
      </button>
    </div>
  );
};

export default BackButton;
