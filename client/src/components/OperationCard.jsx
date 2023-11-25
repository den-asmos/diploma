const OperationCard = ({
  date,
  sum,
  account = null,
  comment = null,
  category,
  className = '',
}) => {
  return (
    <div
      className={`my-2 py-2 px-4 grid grid-rows-1 grid-cols-3 justify-items-evenly border border-[var(--color-mint)] rounded-md text-lg ${className}`}
    >
      <p className="text-[var(--color-dark)]">{date.slice(0, 10)}</p>
      <p className="font-medium">{sum} $</p>
      <p>{category}</p>
      <p>{account}</p>
      <p>{comment}</p>
    </div>
  );
};

export default OperationCard;
