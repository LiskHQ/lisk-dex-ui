import { useDispatch, useSelector } from 'react-redux';
import { AppActions, RootState } from 'store';
import { InfoView } from 'components';
import { useEffect } from 'react';

export const InfoContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { poolDetails } = useSelector((root: RootState) => root.pool);

  useEffect(() => {
    dispatch(AppActions.pool.getTopPoolsFromDatabase({}));
  }, []);

  return (
    <InfoView
      poolDetails={poolDetails}
    />
  );
};