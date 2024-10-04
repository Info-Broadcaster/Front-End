export default function BubbleItem({
  jid,
  name,
  urlImage,
  topic,
  onCheck,
  checkedBubbles,
}) {
  const isChecked = checkedBubbles.includes(jid); // Vérifiez si l'élément est dans la liste cochée

  const handleCheckboxChange = () => {
    onCheck(jid, !isChecked); // Utilisez la valeur calculée isChecked
  };

  return (
    <div
      className={`flex gap-1 p-2 items-center cursor-pointer m-1 ${
        isChecked ? "bg-slate-200" : " hover:bg-slate-100"
      }`}
      onClick={handleCheckboxChange}
    >
      <img
        src={urlImage || "/bubble.jpg"}
        alt={name}
        className="rounded-full border-2 border-gray-100 h-20 w-20 object-cover"
        onError={(e) => {
          e.target.src = "/bubble.jpg";
        }}
      />
      <div className="flex flex-col justify-center">
        <h3 className="font-bold">{name}</h3>
        <p>{topic}</p>
      </div>
      <input
        type="checkbox"
        name="bubble"
        id="bubble"
        className="h-5 w-5 ml-auto rounded-full"
        checked={isChecked}
        onChange={handleCheckboxChange}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
