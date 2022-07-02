import { useEffect, useMemo, useRef, useState } from "react";
import DiaryEditor from "./component/DiaryEditor";
import DiaryList from "./component/DiaryList";
import "./style/app.css";

function App() {
  const [data, setData] = useState([]);
  let diaryID = useRef(0);

  const getData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/comments");
    const json = await res.json();
    const initData = json.slice(0, 20).map((it) => {
      return {
        auther: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: diaryID.current++,
      };
    });
    setData(initData);
    return initData;
  };

  useEffect(() => {
    getData();
  }, []);

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

  const getDataAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const ratio = (goodCount / data.length) * 100;
    return { goodCount, badCount, ratio };
  }, [data.length]);

  const { goodCount, badCount, ratio } = getDataAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>
        <div>전체 일기: {data.length}</div>
        <div>좋은 감정: {goodCount}</div>
        <div>나쁜 감정: {badCount}</div>
        <div>비율: {ratio}</div>
      </div>
      <DiaryList lists={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
// https://jsonplaceholder.typicode.com/comments
