const Button = ({
  children,
  onClick,
  width = 'fit',
  margin = 'my-2',
  type = 'button',
  invert = false,
  className = '',
  disabled = false,
}) => {
  const color = invert
    ? 'text-[var(--color-mint)] bg-transparent border border-[var(--color-mint)]'
    : 'text-white bg-[var(--color-mint)]';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${margin} px-4 py-2 text-lg rounded-md shadow-sm enabled:hover:scale-[1.1] duration-300 ease-in-out ${color} ${className} disabled:opacity-60`}
      style={{ width: width }}
    >
      {children}
    </button>
  );
};

export default Button;
