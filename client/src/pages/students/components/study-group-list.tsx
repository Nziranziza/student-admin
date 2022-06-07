type StudyGroupListProps = {
  data: string[];
};

export default function StudyGroupList({ data }: StudyGroupListProps): JSX.Element {
  if (data.length > 2) {
    return (
      <span>
        {data.slice(0, 2).join(',')} and{' '}
        <span className="text-primary">{data.length - 2} more</span>
      </span>
    );
  }
  return <span>{data.join(',')}</span>;
}