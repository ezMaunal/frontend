import "@/styles/styles.css";
import kakaoLoginBtn from "@/assets/kakao_login_large_narrow.png";
import logoIcon from "@/assets/logo.png";

const Login = () => {
  const handleKakaoLogin = () => {};

  return (
    <div className="main-container">
      <div className="flex min-h-screen flex-col items-center justify-center bg-orange-500 px-4">
        <div className="flex flex-col items-center space-y-4">
          <img
            src={logoIcon}
            alt="ezManual Logo"
            className="h-28 w-28"
          />
          <h1 className="text-4xl font-extrabold text-white">ezManual</h1>
        </div>

        <p className="mt-8 text-center text-lg font-bold text-white">
          매뉴얼을 더 쉽고 빠르게
          <br />
          만들어보세요!!
        </p>

        <div className="mt-10">
          <button onClick={handleKakaoLogin}>
            <img
              src={kakaoLoginBtn}
              alt="카카오 로그인"
              className="h-auto w-[200px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
