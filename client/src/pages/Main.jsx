import {
  Operations,
  CategoriesAndAccounts,
  PieChart,
  LineChart,
} from '../components';
import { waves } from '../assets';

const Main = () => {
  const user = JSON.parse(sessionStorage.getItem('userData'));

  return !user ? (
    <div className="mt-4 flex flex-col justify-start items-center gap-3">
      <h3 className="text-4xl text-[var(--color-mint)]">
        Войдите или зарегистрируйтесь
      </h3>
    </div>
  ) : (
    <>
      <div className="mt-4 flex flex-col justify-start items-center gap-3">
        <h2 className="text-5xl text-[var(--color-dark)]">Good Morning</h2>
        <h3 className="text-4xl text-[var(--color-mint)]">Welcome Back</h3>
      </div>
      <div className="mt-8 flex flex-col items-center gap-6">
        <div className="flex gap-6">
          <Operations />
          <CategoriesAndAccounts />
        </div>
        <div className="flex gap-6">
          <PieChart />
          <LineChart />
        </div>
      </div>
      <img src={waves} alt="waves" className="absolute bottom-0 left-0 -z-10" />
    </>
  );
};

export default Main;
