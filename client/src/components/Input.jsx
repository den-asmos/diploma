import { forwardRef } from 'react';

const Input = forwardRef(({ width = '100%', className, ...props }, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={`my-4 py-2 px-4 rounded-md shadow-[var(--color-light-mint)] shadow-sm focus:outline-none focus:border-[var(--color-mint)] ${className}`}
      style={{ width: width }}
    />
  );
});

export default Input;
