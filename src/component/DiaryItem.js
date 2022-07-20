import { useNavigate } from "react-router-dom";
import { memo } from "react";
import MyBtn from "./MyBtn";

const DiaryItem = ({ id, content, emotion, date }) => {
  const newDate = new Date(parseInt(date)).toLocaleDateString();

  const navigate = useNavigate();

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <li key={id} className="DiaryItem">
      <div
        className={["emotionImg_wrapper", `emotionImg_wrapper_${emotion}`].join(
          " "
        )}
        onClick={goDetail}
      >
        <img
          src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
          alt={`emotionImg${emotion}`}
        />
      </div>
      <div className="info_wrapper" onClick={goDetail}>
        <div className="diary_date">{newDate}</div>
        <p className="diary_content_preview">{content.slice(0, 25)}</p>
      </div>
      <div className="btn_wrapper" onClick={goEdit}>
        <MyBtn text={"수정하기"} />
      </div>
    </li>
  );
};

export default memo(DiaryItem);
