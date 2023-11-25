const Loader = () => {
  return (
    <div className="my-4 flex flex-col items-center gap-2">
      <div className="animate-spin h-10 w-10 border-[4px] border-[var(--color-mint)] border-b-transparent rounded-full"></div>
      <p className="text-lg text-[var(--color-dark)]">Загрузка</p>
    </div>
  );
};

export default Loader;
