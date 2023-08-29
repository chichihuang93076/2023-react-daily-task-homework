import { useEffect, useState } from "react";
import Todo from "./Todo";
import Login from "./Login";

const Home = () => {
  const [token, setToken] = useState("");

  const localtoken = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (localtoken) {
      setToken(localtoken);
    }
  }, [localtoken]);

  return (
    <div>
      {token && <Todo token={token} />}
      {!token && <Login />}
    </div>
  );
};

export default Home;
