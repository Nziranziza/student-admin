import { useState } from 'react';

type StudyGroupListProps = {
  data: string[];
};

export default function StudyGroupList({ data }: StudyGroupListProps): JSX.Element {
  const btnClass = 'text-primary p-0 bg-transparent border-0';
  const [showMore, setShowMore] = useState(false);
  if (data.length > 2 && !showMore) {
    return (
      <span>
        {data.slice(0, 2).join(',')} and{' '}
        <button onClick={() => setShowMore(true)} className={btnClass}>{data.length - 2} more</button>
      </span>
    );
  }
  return <span>
    {data.join(',')}
    {showMore && <button onClick={() => setShowMore(false)} className={btnClass}>show less</button>}
  </span>;
}