import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OperationCard from './OperationCard';
import Button from './Button';
import Loader from './Loader';
import { addIcon } from '../assets';

const Operations = () => {
  const [loading, setLoading] = useState(true);
  const { operations } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (operations) {
      setLoading(false);
    }
  }, [operations]);

  return (
    <div className="w-[470px] h-[260px] p-4 bg-white/70 rounded-md shadow-md">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="mb-4 text-2xl text-[var(--color-dark)] text-center">
              Последние операции
            </h1>
            <Button onClick={() => navigate('/operations/new')}>
              <img src={addIcon} alt="add-icon" className="h-6 w-6 invert" />
            </Button>
          </div>
          {!operations?.length ? (
            <p className="my-2 text-center">Нет операций</p>
          ) : (
            operations
              .slice(0, 3)
              .map((operation) => (
                <OperationCard
                  key={operation._id}
                  id={operation._id}
                  date={operation.date}
                  sum={operation.sum}
                  category={operation.category}
                  cols={3}
                />
              ))
          )}
        </>
      )}
    </div>
  );
};

export default Operations;
