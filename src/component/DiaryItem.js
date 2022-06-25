import { useRef, useState } from "react";

function DiaryItem({ list, onRemove, onEdit }) {
  const [isEdit, setIsEdit] = useState(false);
  const [newContent, setNewContent] = useState(list.content);
  const newTextarea = useRef();
  const toggleIsEdit = () => setIsEdit(!isEdit);

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
        작성자: {list.auther} | 감정: {list.emotion}
      </span>
      <span>작성일: {new Date(list.created_date).toLocaleString()}</span>
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
              <button onClick={handleEdit}>완료</button>
              <button onClick={handleQuitEdit}>취소</button>
            </div>
          </>
        ) : (
          <>
            <button onClick={toggleIsEdit}>수정</button>
            <button onClick={handleRemove}>삭제</button>
          </>
        )}
      </div>
    </li>
  );
}

export default DiaryItem;
