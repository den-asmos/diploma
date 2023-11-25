import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { mapForSelect } from '../utils';
import { selectStyles } from '../constants/styles';
import Button from './Button';
import Loader from './Loader';
import { editIcon } from '../assets';
import { useNavigate } from 'react-router-dom';

const CategoriesAndAccounts = () => {
  const [loading, setLoading] = useState(true);
  const { categories, accounts } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (categories && accounts) {
      setLoading(false);
    }
  }, [categories, accounts]);

  return (
    <div className="w-[380px] h-[260px] p-4 bg-white/70 rounded-md shadow-md">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="mb-2 flex justify-between items-center">
            <h1 className="mb-4 text-2xl text-[var(--color-dark)] text-center">
              Счета и Категории
            </h1>
            <Button onClick={() => navigate('/settings')} invert={true}>
              <img src={editIcon} alt="edit-icon" className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex flex-col items-center">
            {!accounts?.length ? (
              <p className="my-2">Нет счетов</p>
            ) : (
              <Select
                options={mapForSelect(accounts)}
                placeholder="Счета"
                styles={selectStyles}
                width="350px"
              />
            )}
            {!categories?.length ? (
              <p className="my-2">Нет категорий</p>
            ) : (
              <Select
                options={mapForSelect(categories)}
                placeholder="Категории"
                styles={selectStyles}
                width="350px"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoriesAndAccounts;
