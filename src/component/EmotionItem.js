const EmotionItem = ({ descript, id, img, onClick, isSelected }) => {
  return (
    <div
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem_on_${id}` : `EmotionItem_off`,
      ].join(" ")}
      onClick={() => onClick(id)}
    >
      <img src={img} alt={`emotion${id}`} />
      <span>{descript}</span>
    </div>
  );
};

export default EmotionItem;
