import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwd, setPwd] = useState("");
  const [message, setMessage] = useState("");

  const API_URL = "https://todolist-api.hexschool.io";

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    if (password === pwd) {
      signUp();
    } else {
      setMessage("密碼輸入不一致請再次確認");
    }
  };

  const signUp = async () => {
    try {
      const response = await axios.post(`${API_URL}/users/sign_up`, {
        email,
        password,
        nickname,
      });
      console.log(response.data);
      setMessage("註冊成功:" + response.data.uid);
    } catch (error) {
      console.log(error.message);
      setMessage("註冊失敗:" + error.message);
    }
  };

  return (
    <div id="signUpPage" className="bg-yellow">
      <div className="conatiner signUpPage vhContainer">
        <div className="side">
          <a href="#">
            <img
              className="logoImg"
              src="https://upload.cc/i1/2022/03/23/rhefZ3.png"
              alt=""
            />
          </a>
          <img
            className="d-m-n"
            src="https://upload.cc/i1/2022/03/23/tj3Bdk.png"
            alt="workImg"
          />
        </div>
        <div>
          <form className="formControls" action="index.html">
            <h2 className="formControls_txt">註冊帳號</h2>
            <label className="formControls_label" htmlFor="email">
              Email
            </label>
            <input
              className="formControls_input"
              type="text"
              id="email"
              name="email"
              placeholder="請輸入 email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="formControls_label" htmlFor="name">
              您的暱稱
            </label>
            <input
              className="formControls_input"
              type="text"
              name="nickname"
              id="nickname"
              placeholder="請輸入您的暱稱"
              onChange={(e) => setNickname(e.target.value)}
            />
            <label className="formControls_label" htmlFor="pwd">
              密碼
            </label>
            <input
              className="formControls_input"
              type="password"
              name="password"
              id="password"
              placeholder="請輸入密碼"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="formControls_label" htmlFor="pwd">
              再次輸入密碼
            </label>
            <input
              className="formControls_input"
              type="password"
              name="pwd"
              id="pwd"
              placeholder="請再次輸入密碼"
              required
              onChange={(e) => setPwd(e.target.value)}
            />
            <input
              className="formControls_btnSubmit"
              type="button"
              value="註冊帳號"
              onClick={handleSignup}
            />
            <a
              className="formControls_btnLink"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              登入
            </a>
            <span>{message}</span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
