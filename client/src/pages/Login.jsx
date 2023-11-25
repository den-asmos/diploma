import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginAsync } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import { loginImage, logo } from '../assets';
import { Button, Input, Error, Alert } from '../components';

const loginFormSchema = yup.object().shape({
  login: yup
    .string()
    .required('Введите логин')
    .matches(/^\w+$/, 'Некорректный логин')
    .min(3, 'Некорректный логин: не менее 3 символов')
    .max(20, 'Некорректный логин: не более 20 символов'),
  password: yup
    .string()
    .required('Введите пароль')
    .min(5, 'Некорректный пароль: не менее 5 символов'),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
    resolver: yupResolver(loginFormSchema),
  });
  const user = JSON.parse(sessionStorage.getItem('userData'));
  const [serverError, setServerError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/main');
    }
  }, [user, navigate]);

  const onFormSubmit = async ({ login, password }) => {
    try {
      const user = await dispatch(loginAsync(login, password));

      sessionStorage.setItem('userData', JSON.stringify(user));

      navigate('/main');
    } catch (error) {
      setServerError(error.message);

      setTimeout(() => {
        setServerError(null);
      }, 3500);
    }
  };

  const formError = errors?.login?.message || errors?.password?.message;

  return (
    <div>
      <div className="flex justify-start items-center">
        <img src={logo} alt="logo" height={100} width={100} />
        <h1 className="text-6xl font-semibold text-[var(--color-yellow)]">
          Cash<span className="text-[var(--color-mint)]">Flow</span>
        </h1>
      </div>

      <div className="mx-auto flex justify-evenly items-center text-lg">
        <img src={loginImage} alt="login" width={730} />

        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="p-8 w-[450px] flex flex-col justify-start items-center border-r border-t border-[var(--color-mint)] rounded-lg shadow-[var(--color-light-mint)] shadow-md"
        >
          <h2 className="text-6xl my-8 text-center text-[var(--color-mint)]">
            Sign In
          </h2>

          <Input type="text" placeholder="Логин" {...register('login')} />

          <Input
            type="password"
            placeholder="Пароль"
            {...register('password')}
          />
          {formError && <Error message={formError} />}
          {serverError && <Alert message={serverError} />}
          <Button width="50%" type="submit">
            Войти
          </Button>

          <div className="my-2 w-full text-center">
            <Link
              to="/register"
              className="text-base text-[var(--color-mint)] hover:opacity-75"
            >
              Ещё нет аккаунта?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
