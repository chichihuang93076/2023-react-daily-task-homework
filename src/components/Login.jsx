import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const Logo = "https://upload.cc/i1/2022/03/23/rhefZ3.png";
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const API_URL = "https://todolist-api.hexschool.io";

  const signIn = async () => {
    try {
      const response = await axios.post(`${API_URL}/users/sign_in`, {
        email,
        password,
      });
      console.log(response.data);
      if (response.data.status) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.nickname));
        //setMessage("Token:" + response.data.token);
        navigate("/");
      } else {
        setMessage("登入失敗:" + response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      setMessage("登入失敗:" + error.message);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div id="loginPage" className="bg-yellow">
      <div className="conatiner loginPage vhContainer ">
        <div className="side">
          <a href="#">
            <img className="logoImg" src={Logo} alt="" />
          </a>
          <img
            className="d-m-n"
            src="https://upload.cc/i1/2022/03/23/tj3Bdk.png"
            alt="workImg"
          />
        </div>
        <div>
          <form className="formControls" action="index.html">
            <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
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
            <span>此欄位不可留空</span>
            <label className="formControls_label" htmlFor="pwd">
              密碼
            </label>
            <input
              className="formControls_input"
              type="password"
              name="pwd"
              id="pwd"
              placeholder="請輸入密碼"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="formControls_btnSubmit"
              type="button"
              value="登入"
              onClick={signIn}
            />
            <a
              className="formControls_btnLink"
              href="#signUpPage"
              onClick={(e) => {
                e.preventDefault();
                handleRegister();
              }}
            >
              註冊帳號
            </a>
            <span>{message}</span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
