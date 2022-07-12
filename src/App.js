import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useReducer, useRef } from "react";
import "./style/app.css";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

const dummyData = [
  {
    id: 1,
    content: "오늘의 일기 - 1",
    emotion: 1,
    date: 1657447992344,
  },
  {
    id: 2,
    content: "오늘의 일기 - 2",
    emotion: 2,
    date: 1657447992345,
  },
  {
    id: 3,
    content: "오늘의 일기 - 3",
    emotion: 3,
    date: 1657447992346,
  },
  {
    id: 4,
    content: "오늘의 일기 - 4",
    emotion: 4,
    date: 1657447992347,
  },
  {
    id: 5,
    content: "오늘의 일기 - 5",
    emotion: 5,
    date: 1657447992348,
  },
];

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [...action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetID);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = createContext();
export const DiaryDispatchContenxt = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);
  const dataID = useRef(0);
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataID.current,
        data: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataID.current += 1;
  };

  const onRemove = (targetID) => {
    dispatch({ type: "REMOVE", targetID });
  };

  const onEdit = (targetID, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetID,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContenxt.Provider
        value={{
          onCreate,
          onEdit,
          onRemove,
        }}
      >
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/new" element={<New />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContenxt.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
