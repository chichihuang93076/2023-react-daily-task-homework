import "./App.css";
import {
  HashRouter,
  Link,
  NavLink,
  Outlet,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Todo from "./components/Todo";
import Home from "./components/Home";

// const Todo = () => {
//   return (
//     <div>
//       <p>這是 Todo 頁面</p>
//       <Logout />
//     </div>
//   );
// };
// const Login = () => {
//   return <p>這是登入頁面</p>;
// };
// const Register = () => {
//   return <p>這是註冊頁面</p>;
// };

// const Post = () => {
//   return (
//     <div>
//       <p>這是Post頁面</p>
//       <Link to="id123">Post子元件</Link>
//       <Outlet />
//     </div>
//   );
// };

// const PostId = () => {
//   const { postid } = useParams();
//   return <p>這是Postid頁面,postid={postid}</p>;
// };

function App() {
  return (
    <div className="container">
      <HashRouter>
        <div className="nav-link">
          <NavLink to="/">{/* <p>回到首頁</p> */}</NavLink>
          <NavLink to="/register">{/* <p>註冊頁面</p> */}</NavLink>
          <NavLink to="/login">{/* <p>登入頁面</p> */}</NavLink>
          <NavLink to="/todo">{/* <p>Todo 頁面</p> */}</NavLink>
          <NavLink to="/post">{/* <p>Post 頁面</p> */}</NavLink>
        </div>
        {/* Routes, Route 練習區 */}
        {/* 練習區 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todo" element={<Todo />} />
          {/* <Route path="/post" element={<Post />}>
            <Route path=":postid" element={<PostId />} />
          </Route> */}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
