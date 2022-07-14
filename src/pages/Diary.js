import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { getStringDate } from "../util/date";
import MyHeader from "../component/MyHeader";
import MyBtn from "../component/MyBtn";
import { emotionList } from "../util/emotionList";

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [curDiary, setCurDiary] = useState();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetDiary) {
        setCurDiary(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!curDiary) {
    return <div className="DiaryPage">로딩중...</div>;
  } else {
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(curDiary.emotion)
    );

    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(curDiary.date))} 일기`}
          leftChild={<MyBtn text={"<"} onClick={() => navigate(-1)} />}
          rightChild={
            <MyBtn
              text={"수정하기"}
              onClick={() => navigate(`/edit/${curDiary.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "diaryImg_wrapper",
                `diaryImg_wrapper_${curEmotionData.emotion_id}`,
              ].join(" ")}
            >
              <img
                src={curEmotionData.emotion_img}
                alt={`emotionImg${curEmotionData.emotion_id}`}
              />
              <div className="emotion_descript">
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{curDiary.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
