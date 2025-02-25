import { useState } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";

const List = ({ list, onAddFolderClick, onDeleteClick }) => {
  const [visiblityToggle, setVisiblityToggle] = useState({});
  return list.map((item) => (
    <div key={item.name} style={{ margin: "7px 20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {item.isFolder && (
          <span
            onClick={() => {
              setVisiblityToggle((prev) => ({
                ...prev,
                [item.name]: !prev[item.name],
              }));
            }}
            style={{ cursor: "pointer" }}
          >
            {visiblityToggle[item.name] ? "-" : "+"}
          </span>
        )}
        <span>{item.name}</span>
        {item.isFolder && (
          <img
            src="https://cdn-icons-png.flaticon.com/512/5994/5994710.png"
            style={{ width: "20px", cursor: "pointer" }}
            onClick={() => onAddFolderClick(item.id)}
          />
        )}
        <img
          src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
          style={{ width: "15px", cursor: "pointer" }}
          onClick={() => onDeleteClick(item.id)}
        />
      </div>
      {item.isFolder && visiblityToggle[item.name] && (
        <List
          list={item.childeren}
          onAddFolderClick={onAddFolderClick}
          onDeleteClick={onDeleteClick}
        />
      )}
    </div>
  ));
};

function App() {
  const [data, setData] = useState([
    {
      id: uuid(),
      name: "Sushant",
      isFolder: true,
      childeren: [
        {
          id: uuid(),

          name: "children1",
          isFolder: false,
        },
      ],
    },
    {
      id: uuid(),
      name: "package.json",
      isFolder: false,
    },
    {
      id: uuid(),

      name: "temp1",
      isFolder: true,
      childeren: [
        {
          id: uuid(),

          name: "package-lock.json",
          isFolder: false,
        },
        {
          id: uuid(),

          name: "Sushant",
          isFolder: true,
          childeren: [
            {
              id: uuid(),

              name: "children1",
              isFolder: false,
            },
          ],
        },
      ],
    },
  ]);

  const updateTree = (list, name, id) => {
    return list.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          childeren: [
            ...item.childeren,
            {
              id: uuid(),
              name: name,
              isFolder: false,
            },
          ],
        };
      } else if (item.childeren) {
        return { ...item, childeren: updateTree(item.childeren, name, id) };
      }
      return item;
    });
  };

  const onAddFolderClick = (id) => {
    const name = prompt("Enter a name for folder");
    setData((prev) => updateTree(prev, name, id));
  };

  const onDeleteClick = (id) => {
    const deleteNodeFromTree = (prev) => {
      return prev
        .filter((item) => item.id !== id)
        .map((item) => {
          if (item.childeren) {
            return { ...item, childeren: deleteNodeFromTree(item.childeren) };
          }
          return item;
        });
    };

    setData((prev) => deleteNodeFromTree(prev));
  };

  return (
    <List
      list={data}
      onAddFolderClick={onAddFolderClick}
      onDeleteClick={onDeleteClick}
    />
  );
}

export default App;
