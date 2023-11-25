const Alert = ({ message }) => {
  return (
    <div
      className="absolute top-40 p-2 bg-[var(--color-mint)] items-center text-white leading-none lg:rounded-full flex lg:inline-flex alert"
      role="alert"
    >
      <span className="flex rounded-full bg-[var(--color-light-mint)] uppercase px-2 py-1 text-[var(--color-dark)] text-xs font-semibold mr-3">
        Info
      </span>
      <span className="mr-2 text-left flex-auto">{message}</span>
    </div>
  );
};

export default Alert;
