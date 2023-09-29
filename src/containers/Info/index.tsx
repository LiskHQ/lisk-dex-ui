import { useDispatch, useSelector } from 'react-redux';
import { AppActions, RootState } from 'store';
import { InfoView } from 'components';
import { useEffect } from 'react';

export const InfoContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { poolDetails } = useSelector((root: RootState) => root.pool);
  const { conversionRates } = useSelector((root: RootState) => root.token);

  const getToken2FiatConversion = (tokenSymbol: string, currency: string) => {
    dispatch(AppActions.token.getToken2FiatConversion({
      tokenSymbol,
      currency,
    }));
  };

  useEffect(() => {
    dispatch(AppActions.pool.getTopPoolsFromDatabase({}));
  }, []);

  return (
    <InfoView
      poolDetails={poolDetails}
      conversionRates={conversionRates}
      getToken2FiatConversion={getToken2FiatConversion}
    />
  );
};