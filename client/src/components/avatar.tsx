import classnames from 'classnames';

type AvatarProps = {
  size?: 'lg' | 'sm' | 'md',
  firstName: string,
  secondName?: string
}

export default function Avatar({
  size='md',
  firstName,
  secondName=''
}: AvatarProps): JSX.Element {
  const isLg = size === 'lg';
  const isSm = size === 'sm';
  const colors: string[] = [
    'bg-primary',
    'bg-secondary',
    'bg-warning',
    'bg-danger',
    'bg-info',
    'bg-dark',
    'bg-success'
  ];
  const colorIndex = firstName.length % colors.length;
  return (
    <div className={classnames(colors[colorIndex], "rounded-circle overflow-hidden text-uppercase avatar justify-content-center align-items-center d-flex fw-bold",{
      'avatar-lg': isLg,
      'avatar-sm': isSm
    })}>
      <span className="text-white">{firstName.charAt(0)}{secondName.charAt(0)}</span>
    </div>
  );
}
