const Error = ({ message, fontSize, margin }) => {
  return (
    <div
      className={`mb-2 text-center text-[var(--color-dark)] ${fontSize} ${margin}`}
    >
      {message}
    </div>
  );
};

export default Error;
