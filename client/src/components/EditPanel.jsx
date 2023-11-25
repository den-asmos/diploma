import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteOperationAsync } from '../redux/actions';
import Button from './Button';
import { editIcon, deleteIcon } from '../assets';

const EditPanel = ({ id, setSuccessMessage, setServerError }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onEdit = () => {
    navigate(`/operations/${id}/edit`);
  };

  const onDelete = () => {
    dispatch(deleteOperationAsync(id))
      .catch((error) => {
        setServerError(error.message);
      })
      .then(() => {
        setSuccessMessage('Операция успешно удалена');

        setTimeout(() => {
          setSuccessMessage(null);
        }, 3500);
      });
  };

  return (
    <div className="w-fit flex items-center gap-2">
      <Button invert={true} onClick={onEdit}>
        <img src={editIcon} alt="edit-icon" className="h-6 w-6" />
      </Button>
      <Button onClick={onDelete}>
        <img src={deleteIcon} alt="delete-icon" className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default EditPanel;
