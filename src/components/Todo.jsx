import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  let navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [content, setContent] = useState("");
  const [todos, setTodos] = useState([]);
  const API_URL = "https://todolist-api.hexschool.io";

  const uername = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    console.log(token);

    const res = await axios.get(`${API_URL}/todos/`, {
      headers: {
        Authorization: token,
      },
    });
    setTodos(res.data.data);

    console.log(res.data);
  };

  //新增代辦事項
  const addTodo = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/todos/`,
        {
          content: content,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      //console.log(res.data.status);
      if (res.data.status) {
        setContent("");
        getTodos();
        //setMessage("新增成功");
      } else {
        setMessage("新增失敗" + res.data.message);
      }
    } catch (error) {
      setMessage("新增失敗：" + error.message);
    }
  };

  //刪除代辦事項
  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/todos/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      if (res.data.status) {
        getTodos();
      }
    } catch (error) {
      setMessage(error.mssage);
    }
  };

  const handleDeleteTodos = () => {
    todos.map((todo) => deleteTodo(todo.id));
  };

  //變更todo狀態
  const toggleTodo = async (id) => {
    try {
      const res = await axios.patch(
        `${API_URL}/todos/${id}/toggle`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.data.status) {
        getTodos();
      }
    } catch (error) {
      setMessage(error.mssage);
    }
  };

  //logout
  const signOut = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/users/sign_out`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      //console.log(res.data);
      if (res.data.status) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/Login");
      } else {
        setMessage("登出失敗:" + res.data.message);
      }
    } catch (error) {
      setMessage("登出失敗:" + error.message);
    }
  };

  return (
    <div id="todoListPage" className="bg-half">
      {message}
      <nav>
        <h1>
          <a href="#">ONLINE TODO LIST</a>
        </h1>
        <ul>
          <li className="todo_sm">
            <a href="#">
              <span>{uername}的代辦</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={signOut}>
              登出
            </a>
          </li>
        </ul>
      </nav>
      <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
          <div className="inputBox">
            <input
              value={content}
              type="text"
              placeholder="請輸入待辦事項"
              onChange={(e) => setContent(e.target.value)}
            />
            <a href="#" onClick={addTodo}>
              <i className="fa fa-plus"></i>
            </a>
          </div>
          <div className="todoList_list">
            <ul className="todoList_tab">
              <li>
                <a href="#" className="active">
                  全部
                </a>
              </li>
              <li>
                <a href="#">待完成</a>
              </li>
              <li>
                <a href="#">已完成</a>
              </li>
            </ul>

            <div className="todoList_items">
              <ul className="todoList_item">
                {todos.length > 0 &&
                  todos.map((todo, index) => (
                    <li key={index}>
                      <label className="todoList_label">
                        <input
                          className="todoList_input"
                          type="checkbox"
                          value={todo.status}
                          onClick={() => toggleTodo(todo.id)}
                        />
                        <span>{todo.content}</span>
                      </label>
                      <a href="#">
                        <i className="fa fa-times"></i>
                      </a>
                    </li>
                  ))}
              </ul>
              <div className="todoList_statistics">
                <p> 5 個已完成項目</p>
                <a href="#" onClick={handleDeleteTodos}>
                  清除已完成項目
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
