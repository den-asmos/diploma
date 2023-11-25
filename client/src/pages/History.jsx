import { useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { getOperationsAsync } from '../redux/actions';
import {
  Button,
  EditPanel,
  Loader,
  OperationCard,
  Alert,
  Pagination,
  Error,
} from '../components';
import { addIcon, deleteIcon, waves } from '../assets';
import {
  selectStyles,
  filterOptions,
  dateSortingTypeOptions,
} from '../constants';
import { operationsFilter, mapForSelect } from '../utils';
import { useCheckAccess } from '../hooks';

const History = () => {
  const { operations, lastPage } = useSelector((state) => state.operations);
  const { categories, accounts } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSortingOption, setSelectedSortingOption] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useCheckAccess(setError);

  useLayoutEffect(() => {
    dispatch(getOperationsAsync(6, 1))
      .catch((error) => {
        setServerError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const onFiltersReset = () => {
    setSelectedSortingOption(null);
    setSelectedFilter(null);
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Error message={error} fontSize="text-5xl" margin="mt-4" />
  ) : (
    <>
      <h1 className="mt-4 text-5xl text-[var(--color-dark)] text-center">
        История операций
      </h1>
      <div className="mt-8 mx-auto max-w-[1080px] flex justify-center items-center gap-8">
        <Button onClick={onFiltersReset}>
          <img src={deleteIcon} alt="delete-icon" className="w-6 h-6" />
        </Button>
        <Select
          options={filterOptions}
          defaultValue={selectedSortingOption}
          onChange={setSelectedSortingOption}
          value={selectedSortingOption}
          placeholder="Сортировать"
          width="200px"
          styles={selectStyles}
        />

        <Select
          options={
            selectedSortingOption?.value === 'category'
              ? mapForSelect(categories || [])
              : selectedSortingOption?.value === 'date'
              ? dateSortingTypeOptions
              : mapForSelect(accounts || [])
          }
          defaultValue={selectedFilter}
          onChange={setSelectedFilter}
          value={selectedFilter}
          placeholder={selectedSortingOption?.label || 'Фильтр'}
          width="200px"
          styles={selectStyles}
        />

        <Button onClick={() => navigate('/operations/new')}>
          <div className="flex items-center gap-2">
            <img src={addIcon} alt="add-icon" className="h-6 w-6 invert" />
            <p>Добавить операцию</p>
          </div>
        </Button>
      </div>
      <div className="mx-auto mt-8 max-h-[450px] max-w-[1080px] p-4 border-r border-t border-[var(--color-mint)] rounded-lg shadow-[var(--color-light-mint)] shadow-md">
        <div className="w-full flex justify-center">
          {serverError ? (
            <Alert message={serverError} />
          ) : (
            successMessage && <Alert message={successMessage} />
          )}
        </div>
        <OperationCard
          date="Дата"
          sum="Сумма"
          account="Счёт"
          comment="Комментарий"
          category="Категория"
          className="w-[925px] grid-cols-5 border-none font-medium text-[var(--color-dark)]"
        />
        {selectedSortingOption && selectedFilter
          ? operationsFilter(
              operations,
              selectedSortingOption.value,
              selectedFilter.value
            ).map((operation) => (
              <div key={operation._id} className="flex items-center gap-4">
                <OperationCard
                  date={operation.date}
                  sum={operation.sum}
                  account={operation.account}
                  comment={operation.comment}
                  category={operation.category}
                  className="w-full grid-cols-5"
                />
                <EditPanel
                  id={operation._id}
                  setSuccessMessage={setSuccessMessage}
                  setServerError={setServerError}
                />
              </div>
            ))
          : operations.map((operation) => (
              <div key={operation._id} className="flex items-center gap-4">
                <OperationCard
                  date={operation.date}
                  sum={operation.sum}
                  account={operation.account}
                  comment={operation.comment}
                  category={operation.category}
                  className="w-full grid-cols-5"
                />
                <EditPanel
                  id={operation._id}
                  setSuccessMessage={setSuccessMessage}
                />
              </div>
            ))}
      </div>
      <Pagination lastPage={lastPage} />
      <img
        src={waves}
        alt="waves"
        className="w-60 object-contain absolute bottom-0 left-0 -z-10"
      />
    </>
  );
};

export default History;
