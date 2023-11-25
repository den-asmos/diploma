import { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { addCategoryAsync } from '../redux/actions';
import { Button, Input, Error, Alert } from '../components';
import { waves } from '../assets';
import { selectStyles, categoryTypeOptions } from '../constants';
import { useCheckAccess } from '../hooks';

const categoryFormSchema = yup.object({
  title: yup.string().required('Введите название категории'),
  type: yup.object({
    value: yup.string().required('Выберите тип'),
    label: yup.string().required('Выберите тип'),
  }),
});

const NewCategory = () => {
  const {
    reset,
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      type: null,
    },
    resolver: yupResolver(categoryFormSchema),
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useCheckAccess(setError);

  const onFormSubmit = ({ title }) => {
    const newCategory = {
      title,
      type: getValues('type').label,
    };

    dispatch(addCategoryAsync(newCategory))
      .then(() => {
        reset();
        setSuccessMessage('Категория успешно добавлена');

        setTimeout(() => {
          setSuccessMessage(null);
        }, 3500);
      })
      .catch((error) => {
        setServerError(error.message);
      });
  };

  const formError = errors?.title?.message || errors?.type?.label?.message;

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
            New Category
          </h1>

          <Input type="text" placeholder="Название" {...register('title')} />

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                options={categoryTypeOptions}
                placeholder="Тип"
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

export default NewCategory;
