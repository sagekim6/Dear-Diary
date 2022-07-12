import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import DiaryList from "../component/DiaryList";
import MyBtn from "../component/MyBtn";
import MyHeader from "../component/MyHeader";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [curDate, setcurDate] = useState(new Date());
  const [data, setData] = useState([]);

  const headText = `${curDate.getFullYear()}.${curDate.getMonth() + 1}`;

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        1
      ).getTime();

      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [diaryList, curDate]);

  const increaseMonth = () => {
    setcurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  const decreaseMonth = () => {
    setcurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyBtn text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyBtn text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
