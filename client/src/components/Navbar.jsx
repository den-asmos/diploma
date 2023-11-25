import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAsync } from '../redux/actions';
import { userIcon } from '../assets';
import Button from './Button';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  const onLogout = () => {
    sessionStorage.removeItem('userData');
    dispatch(logoutAsync()).then(() => {
      navigate('/login');
    });
  };

  return (
    <nav className="w-full py-4 px-6 flex justify-between items-center bg-white shadow-[var(--color-light-mint)] shadow-sm z-10">
      <div className="flex items-center gap-6 text-xl text-[var(--color-dark)]">
        <h1 className="text-2xl font-medium text-[var(--color-yellow)] mr-8">
          Cash<span className="text-[var(--color-mint)]">Flow</span>
        </h1>
        {user.id && (
          <>
            <NavLink
              to="/main"
              className="hover:text-[var(--color-mint)] duration-200 ease-in"
            >
              Главная
            </NavLink>
            <NavLink
              to="/history"
              className="hover:text-[var(--color-mint)] duration-200 ease-in"
            >
              История
            </NavLink>
            <NavLink
              to="/settings"
              className="hover:text-[var(--color-mint)] duration-200 ease-in"
            >
              Настройки
            </NavLink>
          </>
        )}
      </div>
      {user.id ? (
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <img src={userIcon} alt="user-icon" className="h-8 w-8" />
            <Link
              to={`/user/${user.id}`}
              className="text-2xl font-medium text-[var(--color-mint)] hover:text-[var(--color-dark)] duration-200 ease-in"
            >
              {user.login}
            </Link>
          </div>
          <Button onClick={onLogout}>Выход</Button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button>Вход</Button>
          </Link>
          <Link to="/register">
            <Button invert={true}>Регистрация</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
