import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerAsync } from '../redux/actions';
import { loginImage, logo } from '../assets';
import { Button, Input, Error, Alert } from '../components';

const registerFormSchema = yup.object().shape({
  name: yup
    .string()
    .required('Введите имя')
    .min(2, 'Некорректное имя: не менее 2 символов'),
  login: yup
    .string()
    .required('Введите логин')
    .matches(/^\w+$/, 'Некорректный логин')
    .min(3, 'Некорректный логин: не менее 3 символов')
    .max(20, 'Некорректный логин: не более 20 символов'),
  email: yup.string().required('Введите адрес электронной почты'),
  password: yup
    .string()
    .required('Введите пароль')
    .min(5, 'Некорректный пароль: не менее 5 символов'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      namez: '',
      login: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(registerFormSchema),
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

  const onFormSubmit = async ({ name, login, email, password }) => {
    try {
      const user = await dispatch(registerAsync(name, login, email, password));

      sessionStorage.setItem('userData', JSON.stringify(user));

      navigate('/');
    } catch (error) {
      setServerError(error.message);

      setTimeout(() => {
        setServerError(null);
      }, 3500);
    }
  };

  const formError =
    errors?.name?.message ||
    errors?.login?.message ||
    errors?.email?.message ||
    errors?.password?.message ||
    errors?.passwordConfirm?.message;

  return (
    <>
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
          className="-mt-16 p-8 w-[450px] flex flex-col justify-start items-center border-r border-t border-[var(--color-mint)] rounded-lg shadow-[var(--color-light-mint)] shadow-md"
        >
          <h2 className="text-6xl my-8 text-center text-[var(--color-mint)]">
            Sign Up
          </h2>

          <Input type="text" placeholder="Имя" {...register('name')} />

          <Input type="text" placeholder="Логин" {...register('login')} />

          <Input
            type="email"
            placeholder="Электронная почта"
            {...register('email')}
          />

          <Input
            type="password"
            placeholder="Пароль"
            {...register('password')}
          />

          <Input
            type="password"
            placeholder="Подтверждение пароля"
            {...register('passwordConfirm')}
          />

          {formError && <Error message={formError} />}
          {serverError && <Alert message={serverError} />}
          <Button width="50%" type="submit">
            Регистрация
          </Button>

          <div className="my-2 w-full text-center">
            <Link
              to="/login"
              className="text-base text-[var(--color-mint)] hover:opacity-75"
            >
              Уже есть аккаунт?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
