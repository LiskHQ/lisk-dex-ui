import { SearchComponentStyle } from './index.style';
import { useRouter } from 'next/router';
import { SearchInputComponent } from 'components';

interface ISearchComponentProps {
  className?: string,
}

export const SearchComponent: React.FC<ISearchComponentProps> = (props) => {
  const { className } = props;
  const router = useRouter();

  return (
    <SearchComponentStyle className={className}>
      <SearchInputComponent
        className="search-input"
        placeholder="Search tokens or pools..."
      />
    </SearchComponentStyle>
  );
};
