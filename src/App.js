import "./App.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faSave,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regex)) return false;

    const date = new Date(dateString);
    const timestamp = date.getTime();

    if (typeof timestamp !== "number" || Number.isNaN(timestamp)) return false;

    return date.toISOString().startsWith(dateString);
  };

  const addItem = () => {
    if (text === "" && text2 === "") {
      alert("Lütfen tarih ve görev bilgilerini giriniz!");
    } else if (text === "") {
      alert("Lütfen tarih bilgilerini giriniz!");
    } else if (!isValidDate(text)) {
      alert("Geçerli bir tarih giriniz!");
    } else if (text2 === "") {
      alert("Lütfen görev bilgisi giriniz!");
    } else {
      const newItem = {
        id: Date.now(),
        date: text,
        task: text2,
        completed: false,
      };
      setList([...list, newItem]);
      setText("");
      setText2("");
    }
  };

  const deleteItemById = (id) => {
    const newItems = list.filter((item) => item.id !== id);
    setList(newItems);
  };

  const deleteAll = () => {
    setList([]);
  };

  const editItem = (id, task) => {
    setEditId(id);
    setEditText(task);
  };

  const saveEdit = (id) => {
    const newItems = list.map((item) =>
      item.id === id ? { ...item, task: editText } : item
    );
    setList(newItems);
    setEditId(null);
    setEditText("");
  };

  const completeItem = (id) => {
    const newItems = list.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setList(newItems);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <table
        style={{
          padding: "10px",
          top: "20px",
          right: "20px",
          backgroundColor: "lightgray",
          fontSize: "18px",
          color: "black",
          textAlign: "left",
          verticalAlign: "top",
          width: "1000px",
          height: "auto",
          margin: "10px",
          border: "2px solid black",
        }}
      >
        <p
          style={{
            margin: "10px",
            fontWeight: "bold",
            fontSize: "20px",
            color: "blue",
            textDecoration: "underline",
          }}
        >
          Yapılacaklar Listesi
        </p>
        <div
          style={{
            margin: "10px",
            position: "relative",
            fontWeight: "bold",
            fontSize: "15px",
            textDecoration: "underline",
            fontStyle: "italic",
          }}
        >
          <p>
            Tarih ve Saat Bilgilerini Giriniz:
            <input
              onChange={(e) => setText(e.target.value)}
              style={{ marginLeft: "10px", width: "200px" }}
              type="date"
              value={text}
            />
          </p>
          <p>
            Görevlerinizi Giriniz:
            <input
              onChange={(e) => setText2(e.target.value)}
              style={{ marginLeft: "10px", width: "200px" }}
              type="text"
              maxLength={105}
              value={text2}
            />
          </p>
        </div>
        <button
          style={{ margin: "10px", color: "white", backgroundColor: "blue" }}
          onClick={addItem}
        >
          Add
        </button>
        <button
          style={{ margin: "10px", color: "white", backgroundColor: "red" }}
          onClick={deleteAll}
        >
          Delete All
        </button>
        <ul>
          {list.map((item) => (
            <li
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                textDecoration: item.completed ? "line-through" : "none",
              }}
            >
              <div>
                <strong>Tarih:</strong> {item.date} <br />
                <strong>Görev:</strong>{" "}
                {editId === item.id ? (
                  <input
                    type="text"
                    maxLength={105}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  item.task
                )}
              </div>
              <div>
                <FontAwesomeIcon
                  icon={faCheck}
                  onClick={() => completeItem(item.id)}
                  style={{
                    cursor: "pointer",
                    marginLeft: "10px",
                    color: item.completed ? "green" : "gray",
                  }}
                />
                {editId === item.id ? (
                  <FontAwesomeIcon
                    icon={faSave}
                    onClick={() => saveEdit(item.id)}
                    style={{
                      cursor: "pointer",
                      marginLeft: "10px",
                      color: "green",
                    }}
                  />
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={() => editItem(item.id, item.task)}
                      style={{
                        cursor: "pointer",
                        marginLeft: "10px",
                        color: "blue",
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => deleteItemById(item.id)}
                      style={{
                        cursor: "pointer",
                        marginLeft: "10px",
                        color: "red",
                      }}
                    />
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </table>
    </div>
  );
}

export default App;
