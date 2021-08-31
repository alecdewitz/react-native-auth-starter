import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import { getFlattenedFavorites } from '../store/selectors/index';

export const usePotentialFavorite = (user) => {
  const { user: currentUser } = useSelector((state: RootState) => state.auth);
  const favorites = useSelector(getFlattenedFavorites || []);

  if (!user) return null;

  return favorites.find((favorite: any) => user.id === favorite.id && currentUser.id !== user.id);
};
