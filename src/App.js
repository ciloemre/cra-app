import "./App.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faSave,
  faCheck,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

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
    <div className="container">
      <div className="table-container">
        <h3>Yapılacaklar Listesi</h3>
        <div className="input-container">
          <p>
            Tarih ve Saat Bilgilerini Giriniz:
            <input
              onChange={(e) => setText(e.target.value)}
              type="date"
              value={text}
            />
          </p>
          <p>
            Görevlerinizi Giriniz:
            <input
              onChange={(e) => setText2(e.target.value)}
              type="text"
              maxLength={105}
              value={text2}
            />
          </p>
        </div>
        <button className="button" onClick={addItem}>
          Add
        </button>
        <button className="button delete-all" onClick={deleteAll}>
          Delete All
        </button>
        <ul>
          {list.map((item) => (
            <li
              className={`list-item ${item.completed ? "completed" : ""}`}
              key={item.id}
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
              <div className="actions">
                <FontAwesomeIcon
                  icon={faCheck}
                  onClick={() => completeItem(item.id)}
                  className="icon"
                  style={{
                    color: item.completed ? "green" : "gray",
                  }}
                />
                {editId === item.id ? (
                  <FontAwesomeIcon
                    icon={faSave}
                    onClick={() => saveEdit(item.id)}
                    className="icon"
                    style={{ color: "green" }}
                  />
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={() => editItem(item.id, item.task)}
                      className="icon"
                      style={{ color: "blue" }}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => deleteItemById(item.id)}
                      className="icon"
                      style={{ color: "red" }}
                    />
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Heart and Arrow Animation */}
      <div
        style={{
          position: "absolute",
          top: "651px",
          left: "-39px",
          zIndex: 10,
          width: "150px",
          height: "150px",
        }}
      >
        <motion.div
          animate={{ rotate: [45] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            fontSize: "40px",
            color: "red",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon
              icon={faHeart}
              style={{ fontSize: "100px", color: "red" }}
            />
            <div
              style={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                top: "0",
                left: "0",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  fontSize: "30px",
                  fontWeight: "bold",
                  color: "white",
                  top: "20%",
                  left: "27%",
                }}
              >
                E
              </span>
              <span
                style={{
                  position: "absolute",
                  fontSize: "30px",
                  fontWeight: "bold",
                  color: "white",
                  top: "20%",
                  left: "60%",
                }}
              >
                Z
              </span>
            </div>
          </div>
        </motion.div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "507px",
          right: "45px",
          zIndex: 10,
          width: "150px",
          height: "150px",
        }}
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            fontSize: "40px",
            color: "red",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon
              icon={faHeart}
              style={{ fontSize: "220px", color: "red" }}
            />
            <div
              style={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                top: "0",
                left: "0",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "white",
                  top: "19%",
                  left: "13%",
                }}
              >
                Sınırsız
              </span>
              <span
                style={{
                  position: "absolute",
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "white",
                  top: "36%",
                  left: "38%",
                }}
              >
                ve
              </span>
              <span
                style={{
                  position: "absolute",
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "white",
                  top: "51%",
                  left: "13%",
                }}
              >
                Sonsuz...
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
