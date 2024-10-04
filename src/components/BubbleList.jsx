import BubbleItem from "./BubbleItem";

export default function BubbleList({ bubbles, onCheckBubble, checkedBubbles }) {
  if (bubbles.length === 0) {
    return (
      <div className="flex justify-center items-center flex-col gap-4 ">
        <span>Vous ne suivez aucune bulle</span>
      </div>
    );
  }

  return bubbles.map((item) => (
    <BubbleItem
      key={item.jid}
      jid={item.jid}
      name={item.name}
      urlImage={item.avatar}
      topic={item.topic}
      onCheck={onCheckBubble}
      checkedBubbles={checkedBubbles}
    />
  ));
}
