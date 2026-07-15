import Chip from '@/components/ui/Chip';

export default function SuggestedQuestions({ items, onSelect }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <Chip key={item} onClick={() => onSelect(item)}>
          {item}
        </Chip>
      ))}
    </div>
  );
}
