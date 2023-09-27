import { InfoView } from 'components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppActions, RootState } from 'store';

export const InfoContainer: React.FC = () => {
  const dispatch = useDispatch();

  const { tokenDetails } = useSelector((root: RootState) => root.token);

  useEffect(() => {
    dispatch(AppActions.token.getTopTokensFromDatabase({}));
  }, [dispatch]);
  return (
    <InfoView
      tokenDetails={tokenDetails}
    />
  );
};