import { useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { getConnectionById } from 'selectors';

const useConnectedUser = (connectionId) => {
  const { user: currentUser } = useSelector((state: RootState) => state.auth);
  const connection: any = useSelector((state: RootState) =>
    getConnectionById(state, +connectionId),
  );
  const initiator = connection?.initiator.id === currentUser.id;
  return initiator ? connection?.receiver : connection?.initiator;
};

export default useConnectedUser;
