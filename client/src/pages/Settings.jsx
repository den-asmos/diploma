import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Alert,
  Error,
  EditCategory,
  EditAccount,
  Loader,
} from '../components';
import { addIcon, waves } from '../assets';
import { useCheckAccess } from '../hooks';

const Settings = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { categories, accounts } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useCheckAccess(setError);

  useEffect(() => {
    if ((accounts && categories) || error) {
      setLoading(false);
    }
  }, [error, accounts, categories]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Error message={error} fontSize="text-5xl" margin="mt-4" />
  ) : (
    <>
      <h1 className="mt-4 text-5xl text-[var(--color-dark)] text-center">
        Настройки
      </h1>
      <div className="mt-8 flex justify-evenly items-start">
        {successMessage && <Alert message={successMessage} />}
        <div className="w-fit max-h-[650px] overflow-y-scroll p-4 rounded-md shadow-md">
          <div className="flex justify-center items-center gap-4">
            <h1 className="text-3xl text-[var(--color-dark)] text-center">
              Категории
            </h1>
            <Button onClick={() => navigate('/categories/new')}>
              <img src={addIcon} alt="add-icon" className="h-6 w-6 invert" />
            </Button>
          </div>
          {!categories?.length ? (
            <p className="my-2">Нет категорий</p>
          ) : (
            categories.map((category) => (
              <EditCategory
                key={category._id}
                id={category._id}
                title={category.title}
                type={category.type}
                setSuccessMessage={setSuccessMessage}
              />
            ))
          )}
        </div>
        <div className="w-fit max-h-[650px] overflow-y-scroll p-4 rounded-md shadow-md">
          <div className="flex justify-center items-center gap-4">
            <h1 className="text-3xl text-[var(--color-dark)] text-center">
              Счета
            </h1>
            <Button onClick={() => navigate('/accounts/new')}>
              <img src={addIcon} alt="add-icon" className="h-6 w-6 invert" />
            </Button>
          </div>
          {!accounts?.length ? (
            <p className="my-2">Нет счетов</p>
          ) : (
            accounts.map((account) => (
              <EditAccount
                key={account._id}
                id={account._id}
                title={account.title}
                type={account.type}
                setSuccessMessage={setSuccessMessage}
              />
            ))
          )}
        </div>
      </div>
      <img
        src={waves}
        alt="waves"
        className="w-60 object-contain absolute bottom-0 right-0 wave-left -z-10"
      />
    </>
  );
};

export default Settings;
