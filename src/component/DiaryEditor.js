import { useRef, useState, memo, useContext } from "react";
import { DiaryDispatchContext } from "../App";

function DiaryEditor() {
  const inputRef = useRef();
  const textareaRef = useRef();
  const { onCreate } = useContext(DiaryDispatchContext);

  const [state, setState] = useState({
    auther: "",
    content: "",
    emotion: 1,
  });

  const handleChangeData = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (state.auther.length < 1) {
      inputRef.current.focus();
      return;
    }
    if (state.content < 1) {
      textareaRef.current.focus();
      return;
    }
    alert("저장되었습니다.");
    onCreate(state.auther, state.content, state.emotion);
    setState({
      auther: "",
      content: "",
      emotion: 1,
    });
  };

  return (
    <div className="DiaryEditor">
      <div className="EditContainer">
        <h1>Dear Diary</h1>
        <input
          type="text"
          name="auther"
          placeholder="작성자"
          value={state.auther}
          onChange={handleChangeData}
          ref={inputRef}
        />
        <textarea
          type="text"
          name="content"
          placeholder="오늘의 일기"
          value={state.content}
          onChange={handleChangeData}
          ref={textareaRef}
        />
        <div className="todayEmotion">
          <span>오늘의 감정 </span>
          <select
            name="emotion"
            value={state.emotion}
            onChange={handleChangeData}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <button className="saveBtn" onClick={handleSubmit}>
          저장
        </button>
      </div>
    </div>
  );
}
export default memo(DiaryEditor);
