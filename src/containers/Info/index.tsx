import { InfoView } from 'components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppActions, RootState } from 'store';

export const InfoContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [moduleCommand, setModuleCommand] = useState<string>('');
  const { transactions } = useSelector((root: RootState) => root.transaction);

  useEffect(() => {
    dispatch(AppActions.transaction.getTransactions({
      moduleCommand: moduleCommand || undefined,
    }));
  }, [dispatch, moduleCommand]);

  const onChangeTransactionCommand = (value: string) => {
    console.log("moduleCommand: ", value);
    setModuleCommand(value);
  }

  return (
    <InfoView
      transactions={transactions}
      onChangeTransactionCommand={onChangeTransactionCommand}
    />
  );
};