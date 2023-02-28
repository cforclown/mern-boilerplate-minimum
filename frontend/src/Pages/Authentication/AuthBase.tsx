interface IAuthRootLayoutBase {
  children: React.ReactNode;
  className?: string;
}

function AuthBase({ children, className }: IAuthRootLayoutBase): JSX.Element {
  return (
    <div className={className}>
      <div className="content">
        <div className="shape" />
        <div className="shape" />
      </div>
      {children}
    </div>
  );
}

export default AuthBase;
