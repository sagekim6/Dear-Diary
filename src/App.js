import { useRef, useState } from "react";
import DiaryEditor from "./component/DiaryEditor";
import DiaryList from "./component/DiaryList";
import "./style/app.css";

function App() {
  const [data, setData] = useState([]);
  let diaryID = useRef(1);

  const onCreate = (auther, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      auther,
      content,
      emotion,
      created_date,
      id: diaryID.current,
    };
    diaryID.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetID) => {
    const filteredData = data.filter((it) => it.id !== targetID);
    setData([...filteredData]);
  };

  const onEdit = (targetID, newContent) => {
    setData(
      data.map((it) => {
        return it.id === targetID ? { ...it, content: newContent } : it;
      })
    );
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList lists={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
