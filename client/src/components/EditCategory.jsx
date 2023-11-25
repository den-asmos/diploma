import { useState } from 'react';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import Button from './Button';
import Input from './Input';
import Error from './Error';
import { updateCategoryAsync, deleteCategoryAsync } from '../redux/actions';
import { categoryTypeOptions, selectStyles } from '../constants';
import { saveIcon, deleteIcon } from '../assets';

const categoryFormSchema = yup.object({
  title: yup.string().required('Введите название категории'),
  type: yup.object({
    value: yup.string().required('Выберите тип'),
    label: yup.string().required('Выберите тип'),
  }),
});

const EditCategory = ({ id, title, type, setSuccessMessage }) => {
  const [serverError, setServerError] = useState(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title,
      type: { value: type, label: type },
    },
    resolver: yupResolver(categoryFormSchema),
  });

  const onFormSubmit = ({ title }) => {
    const newCategory = {
      title,
      type: getValues('type').label,
    };

    dispatch(updateCategoryAsync(id, newCategory))
      .then(() => {
        setSuccessMessage('Категория успешно изменена');

        setTimeout(() => {
          setSuccessMessage(null);
        }, 3500);
      })
      .catch((error) => {
        setServerError(error.message);
      });
  };

  const onDelete = () => {
    dispatch(deleteCategoryAsync(id)).then(() => {
      setSuccessMessage('Категория успешно удалена');

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3500);
    });
  };

  const formError = errors?.title?.message || errors?.type?.label?.message;

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="w-fit py-2 px-4 flex items-center gap-4 text-lg"
    >
      <Input
        type="text"
        placeholder="Название"
        width="40%"
        {...register('title')}
      />

      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <Select
            options={categoryTypeOptions}
            placeholder="Тип"
            defaultValue={{ value: type, label: type }}
            styles={selectStyles}
            width="200px"
            {...field}
          />
        )}
      />

      {serverError ? (
        <Error message={serverError} />
      ) : (
        formError && <Error message={formError} />
      )}
      <Button type="submit" width="fit-content" invert={true}>
        <img src={saveIcon} alt="save-icon" className="w-6 h-6" />
      </Button>
      <Button width="fit-content" onClick={onDelete}>
        <img src={deleteIcon} alt="delete-icon" className="w-6 h-6" />
      </Button>
    </form>
  );
};

export default EditCategory;
