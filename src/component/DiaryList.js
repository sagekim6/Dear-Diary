import DiaryItem from "./DiaryItem";

function DiaryList({ lists = [], onRemove, onEdit }) {
  return (
    <div className="DiaryList">
      <h2>{lists.length}개의 일기가 있습니다.</h2>
      <ul>
        {lists.map((list) => {
          return (
            <DiaryItem
              key={list.id}
              list={list}
              onRemove={onRemove}
              onEdit={onEdit}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default DiaryList;
