import { useRef, useState, memo, useContext } from "react";
import { DiaryDispatchContext } from "../App";

function DiaryItem({ list }) {
  const [isEdit, setIsEdit] = useState(false);
  const [newContent, setNewContent] = useState(list.content);
  const newTextarea = useRef();
  const toggleIsEdit = () => setIsEdit(!isEdit);
  const { onRemove, onEdit } = useContext(DiaryDispatchContext);

  const handleRemove = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      onRemove(list.id);
    }
  };

  const handleEdit = () => {
    if (newContent.length < 1) {
      newTextarea.current.focus();
      return;
    }
    if (window.confirm("수정하시겠습니까?")) {
      onEdit(list.id, newContent);
      toggleIsEdit();
    }
  };

  const handleChangeContent = (e) => {
    setNewContent(e.target.value);
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setNewContent(list.content);
  };

  return (
    <li className="DiaryItem">
      <span>
        작성자: <strong>{list.auther}</strong> | 감정:{" "}
        <strong>{list.emotion}</strong>
      </span>
      <span className="Created-Date">
        작성일: {new Date(list.created_date).toLocaleString()}
      </span>
      <div>
        {isEdit ? (
          <textarea
            ref={newTextarea}
            value={newContent}
            onChange={handleChangeContent}
          />
        ) : (
          <p>{list.content}</p>
        )}
        {isEdit ? (
          <>
            <div>
              <button className="btn Finished" onClick={handleEdit}>
                완료
              </button>
              <button className="btn" onClick={handleQuitEdit}>
                취소
              </button>
            </div>
          </>
        ) : (
          <>
            <button className="btn Edit" onClick={toggleIsEdit}>
              수정
            </button>
            <button className="btn" onClick={handleRemove}>
              삭제
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default memo(DiaryItem);
