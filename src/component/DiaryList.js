import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import MyBtn from "./MyBtn";

const sortOptionList = [
  { value: "latest", name: "최신 순" },
  { value: "oldest", name: "오래된 순" },
];

const sortFilterList = [
  { value: "all", name: "전부" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  const handleValueChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleValueChange}
      className={"ControlMenu"}
    >
      {optionList.map((el, i) => (
        <option key={i} value={el.value}>
          {el.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList = [] }) => {
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  const getProcessedDiaryList = () => {
    const filterCallback = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const copy = JSON.parse(JSON.stringify(diaryList));

    const filteredList =
      filter === "all" ? copy : copy.filter((it) => filterCallback(it));

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={sortFilterList}
          />
        </div>
        <div className="right_col">
          <MyBtn
            type="positive"
            text={"새 일기 작성"}
            onClick={() => {
              navigate("/new");
            }}
          />
        </div>
      </div>
      <ul>
        {getProcessedDiaryList().map((it) => {
          return (
            <DiaryItem
              key={it.id}
              id={it.id}
              content={it.content}
              emotion={it.emotion}
              date={it.date}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default DiaryList;
