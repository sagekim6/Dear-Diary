import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useReducer,
  createContext,
} from "react";
import DiaryEditor from "./component/DiaryEditor";
import DiaryList from "./component/DiaryList";
import "./style/app.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetID);
    }
    case "EDIT": {
      return state.map((it) =>
        it.id === action.targetID ? { ...it, content: action.newContent } : it
      );
    }
    default:
      return state;
  }
};

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
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
    dispatch({ type: "INIT", data: initData });
    return initData;
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((auther, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        auther,
        content,
        emotion,
        id: diaryID.current,
      },
    });
    diaryID.current += 1;
  }, []);

  const onRemove = useCallback((targetID) => {
    dispatch({ type: "REMOVE", targetID });
  }, []);

  const onEdit = useCallback((targetID, newContent) => {
    dispatch({ type: "EDIT", targetID, newContent });
  }, []);

  const getDataAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const ratio = (goodCount / data.length) * 100;
    return { goodCount, badCount, ratio };
  }, [data.length]);

  const { goodCount, badCount, ratio } = getDataAnalysis;

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []);

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEditor onCreate={onCreate} />
          <div>
            <div>전체 일기: {data.length}</div>
            <div>좋은 감정: {goodCount}</div>
            <div>나쁜 감정: {badCount}</div>
            <div>비율: {ratio}</div>
          </div>
          <DiaryList onRemove={onRemove} onEdit={onEdit} />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
