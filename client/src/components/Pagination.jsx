import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getOperationsAsync } from '../redux/actions';
import { arrowIcon } from '../assets';
import Button from './Button';

const Pagination = ({ lastPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const onNextClick = () => {
    dispatch(getOperationsAsync(6, currentPage + 1)).then(() => {
      setCurrentPage(currentPage + 1);
    });
  };

  const onPrevClick = () => {
    dispatch(getOperationsAsync(6, currentPage - 1)).then(() => {
      setCurrentPage(currentPage - 1);
    });
  };

  return (
    <div className="mt-8 w-full flex justify-center items-center text-lg">
      <Button
        disabled={currentPage === 1}
        invert={true}
        onClick={onPrevClick}
        className="border-none shadow-white"
      >
        <img src={arrowIcon} alt="arrow-prev" className="h-6 w-6 rotate-180" />
      </Button>
      <p className="py-2 px-4 border border-[var(--color-mint)] rounded-md cursor-default">
        {currentPage}
      </p>
      <Button
        disabled={currentPage === lastPage}
        invert={true}
        onClick={onNextClick}
        className="border-none shadow-white"
      >
        <img src={arrowIcon} alt="arrow-next" className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default Pagination;
