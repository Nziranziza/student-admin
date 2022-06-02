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
}: AvatarProps) {
  const isLg = size === 'lg';
  return (
    <div className={classnames("rounded-circle overflow-hidden text-uppercase avatar bg-secondary justify-content-center align-items-center d-flex fw-bold",{
      'avatar-lg': isLg
    })}>
      <span className="text-white">{firstName.charAt(0)}{secondName.charAt(0)}</span>
    </div>
  );
}
