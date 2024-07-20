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
  const [list, setList] = useState([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" },
    { id: 5, name: "Item 5" },
    { id: 6, name: "Item 6" },
    { id: 7, name: "Item 7" },
  ]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const addItem = () => {
    if (text === "" && text2 === "") {
      alert("Lütfen bir değer giriniz!");
    } else {
      const newItems = [];
      if (text !== "") {
        newItems.push({ id: Date.now() + 1, name: text });
      }
      if (text2 !== "") {
        newItems.push({ id: Date.now() + 2, name: text2 });
      }
      setList([...list, ...newItems]);
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

  const editItem = (id, name) => {
    setEditId(id);
    setEditText(name);
  };

  const saveEdit = (id) => {
    const newItems = list.map((item) =>
      item.id === id ? { ...item, name: editText } : item
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
          display: "inline-block",
          position: "relative",
          top: "20px",
          right: "20px",
          backgroundColor: "lightgray",
          fontSize: "18px",
          color: "black",
          textAlign: "left",
          verticalAlign: "top",
          width: "auto",
          height: "auto",
          margin: "10px",
          border: "2px solid black",
        }}
      >
        <input
          onChange={(e) => setText(e.target.value)}
          style={{ margin: "10px", width: "200px" }}
          type="text"
          value={text}
        />
        <input
          onChange={(e) => setText2(e.target.value)}
          style={{ margin: "10px", width: "200px" }}
          type="text"
          value={text2}
        />

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
              {editId === item.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                item.name
              )}
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
                      onClick={() => editItem(item.id, item.name)}
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
