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
      <div className="heart-container heart-left">
        <motion.div
          animate={{ rotate: [135] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="heart-animation"
        >
          <div className="heart-content">
            <FontAwesomeIcon icon={faHeart} className="heart-icon" />
            <div className="heart-labels">
              <span className="label-e">E</span>
              <span className="label-z">Z</span>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="heart-container heart-right">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="heart-animation"
        >
          <div className="heart-content">
            <FontAwesomeIcon icon={faHeart} className="heart-icon-large" />
            <div className="heart-labels-large">
              <span className="label-limitless">Sınırsız</span>
              <span className="label-and">ve</span>
              <span className="label-infinite">Sonsuz...</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
