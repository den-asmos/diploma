import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getInfoAsync, login } from './redux/actions';
import {
  Main,
  History,
  Login,
  User,
  Register,
  NewOperation,
  NotFound,
  EditOperation,
  Settings,
  NewCategory,
  NewAccount,
} from './pages';
import { Navbar } from './components';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('userData'));

    if (user) {
      dispatch(getInfoAsync(user.id)).then((data) => {
        dispatch(login(data));
      });
    }
  }, [dispatch]);

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/history" element={<History />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/operations/new" element={<NewOperation />} />
          <Route path="/categories/new" element={<NewCategory />} />
          <Route path="/accounts/new" element={<NewAccount />} />
          <Route path="/operations/:id/edit" element={<EditOperation />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
