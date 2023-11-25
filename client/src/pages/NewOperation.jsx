import { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { addOperationAsync } from '../redux/actions';
import { Button, Input, Error, Alert } from '../components';
import { waves } from '../assets';
import { selectStyles } from '../constants';
import { mapForSelect } from '../utils';
import { useCheckAccess } from '../hooks';

const operationFormSchema = yup.object({
  sum: yup
    .string()
    .required('Введите сумму')
    .min(1, 'Минимальная сумма операции 1$'),
  account: yup.object({
    value: yup.string().required('Выберите счёт'),
    label: yup.string().required('Выберите счёт'),
  }),
  category: yup.object({
    value: yup.string().required('Выберите категорию'),
    label: yup.string().required('Выберите категорию'),
  }),
  comment: yup.string(),
});

const NewOperation = () => {
  const {
    reset,
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sum: '',
      category: null,
      account: null,
      comment: '',
    },
    resolver: yupResolver(operationFormSchema),
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [error, setError] = useState(null);
  const { categories, accounts } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useCheckAccess(setError);

  const onFormSubmit = ({ sum, comment }) => {
    const newOperation = {
      sum,
      account: getValues('account').label,
      category: getValues('category').label,
      comment,
    };

    dispatch(addOperationAsync(newOperation))
      .then(() => {
        reset();
        setSuccessMessage('Операция успешно добавлена');

        setTimeout(() => {
          setSuccessMessage(null);
        }, 3500);
      })
      .catch((error) => {
        setServerError(error.message);
      });
  };

  const formError =
    errors?.sum?.message ||
    errors?.account?.label?.message ||
    errors?.category?.label?.message ||
    errors?.comment?.message;

  return error ? (
    <Error message={error} fontSize="text-5xl" margin="mt-4" />
  ) : (
    <>
      <div className="mx-auto mt-16 flex flex-col justify-center items-center w-[500px] text-lg">
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="p-8 flex flex-col justify-center items-center border-r border-t border-[var(--color-mint)] rounded-lg shadow-[var(--color-light-mint)] shadow-md"
        >
          <h1 className="text-5xl my-8 text-center text-[var(--color-mint)]">
            New Operation
          </h1>
          <div className="flex justify-start items-center">
            <Input
              type="number"
              placeholder="Сумма"
              width="40%"
              {...register('sum')}
            />
            <span className="ml-1 mr-6 text-[var(--color-dark)]">$</span>

            <Input
              type="text"
              placeholder="Комментарий"
              {...register('comment')}
            />
          </div>

          <Controller
            name="account"
            control={control}
            render={({ field }) => (
              <Select
                options={mapForSelect(accounts || [])}
                placeholder="Счёт"
                value={null}
                styles={selectStyles}
                width="430px"
                {...field}
              />
            )}
          />

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                options={mapForSelect(categories || [])}
                placeholder="Категория"
                value={null}
                styles={selectStyles}
                width="430px"
                {...field}
              />
            )}
          />
          {serverError ? (
            <Error message={serverError} />
          ) : (
            formError && <Error message={formError} />
          )}
          {successMessage && <Alert message={successMessage} />}
          <Button type="submit" width="50%" margin="mt-4">
            Подтвердить
          </Button>
        </form>
      </div>
      <img
        src={waves}
        alt="waves"
        className="absolute bottom-0 right-0 wave-left"
      />
    </>
  );
};

export default NewOperation;
