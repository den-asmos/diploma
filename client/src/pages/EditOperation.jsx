import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Error, Alert, Loader } from '../components';
import { getOperationByIdAsync, updateOperationAsync } from '../redux/actions';
import { waves } from '../assets';
import { mapForSelect } from '../utils';
import { selectStyles } from '../constants';
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

const EditOperation = () => {
  const params = useParams();
  const [successMessage, setSuccessMessage] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { categories, accounts } = useSelector((state) => state.auth);
  const operation = useSelector((state) => state.operation);

  useCheckAccess(setError);

  const {
    reset,
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sum: '',
      account: null,
      category: null,
      comment: '',
    },
    resolver: yupResolver(operationFormSchema),
  });

  useEffect(() => {
    dispatch(getOperationByIdAsync(params.id))
      .catch((error) => {
        setServerError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, params.id]);

  useEffect(() => {
    reset({
      sum: operation.sum,
      account: { value: operation.account, label: operation.account },
      category: { value: operation.category, label: operation.category },
      comment: operation.comment,
    });
  }, [operation, reset]);

  const onFormSubmit = ({ sum, comment }) => {
    const newOperation = {
      sum,
      account: getValues('account').label,
      category: getValues('category').label,
      comment,
    };

    dispatch(updateOperationAsync(params.id, newOperation))
      .then(() => {
        setSuccessMessage('Операция успешно изменена');

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

  return loading ? (
    <Loader />
  ) : error || serverError ? (
    <Error message={error || serverError} fontSize="text-5xl" margin="mt-4" />
  ) : (
    <>
      <div className="mx-auto mt-16 flex flex-col justify-center items-center w-[500px] text-lg">
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="p-8 flex flex-col justify-center items-center border-r border-t border-[var(--color-mint)] rounded-lg shadow-[var(--color-light-mint)] shadow-md"
        >
          <h1 className="text-5xl my-8 text-center text-[var(--color-mint)]">
            Edit
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
                options={mapForSelect(accounts)}
                placeholder="Счёт"
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
                options={mapForSelect(categories)}
                placeholder="Категория"
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
          <Button type="submit" width="50%">
            Сохранить
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

export default EditOperation;
