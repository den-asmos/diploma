import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateUserAsync } from '../redux/actions';
import { useCheckAccess } from '../hooks';
import { Button, Input, Error, Alert } from '../components';
import { userImage } from '../assets';
import { useParams } from 'react-router-dom';

const userFormSchema = yup.object().shape({
  login: yup
    .string()
    .required('Введите логин')
    .matches(/^\w+$/, 'Некорректный логин')
    .min(3, 'Некорректный логин: не менее 3 символов')
    .max(20, 'Некорректный логин: не более 20 символов'),
  name: yup
    .string()
    .required('Введите имя')
    .max(20, 'Некорректное имя: не более 20 символов'),
  email: yup.string().required('Введите адрес электронной почты'),
});

const User = () => {
  const user = JSON.parse(sessionStorage.getItem('userData'));
  const [error, setError] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [serverMessage, setServerMessage] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  useCheckAccess(setError);

  useEffect(() => {
    if (params.id !== user?.id) {
      setError('Пользователь не найден');
    }
  }, [setError, params.id, user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: user?.login,
      name: user?.name,
      email: user?.email,
    },
    resolver: yupResolver(userFormSchema),
  });

  const onFormSubmit = async ({ login, name, email }) => {
    try {
      const newUser = await dispatch(
        updateUserAsync(user.id, { login, name, email })
      );

      sessionStorage.setItem('userData', JSON.stringify(newUser));

      setServerMessage('Данные обновлены');

      setTimeout(() => {
        setServerMessage(null);
      }, 3500);
    } catch (error) {
      setServerError(error.message);

      setTimeout(() => {
        setServerError(null);
      }, 3500);
    }
  };

  const formError =
    errors?.login?.message || errors?.name?.message || errors?.email?.message;

  return error ? (
    <Error message={error} fontSize="text-5xl" margin="mt-4" />
  ) : (
    <>
      <div className="w-[50%] mt-20 flex justify-center items-center text-lg">
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="p-8 w-[400px] flex flex-col justify-center items-center"
        >
          <Input
            type="text"
            placeholder="Логин"
            {...register('login')}
            className="my-8 text-6xl text-[var(--color-mint)] text-center"
          />
          <Input type="text" placeholder="Имя" {...register('name')} />
          <Input
            type="email"
            placeholder="Электронный адрес"
            {...register('email')}
          />
          {formError && <Error message={formError} />}
          {serverError && <Alert message={serverError} />}
          {serverMessage && <Alert message={serverMessage} />}
          <Button type="submit" width="50%" margin="my-4">
            Сохранить
          </Button>
        </form>
      </div>
      <img src={userImage} alt="user" className="absolute bottom-0 right-10" />
    </>
  );
};

export default User;
