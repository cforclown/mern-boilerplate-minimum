export interface IPage404 {
  fullscreen?: boolean;
  className?: string;
}

export function Page404Base({ className }: IPage404): JSX.Element {
  return (
    <div className={className}>
      <h1>
        404
        {' '}
        <span>|</span>
        {' '}
        Page not found
      </h1>
    </div>
  );
}
