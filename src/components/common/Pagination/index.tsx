import { Box, IconButton, MenuItem, Typography } from '@mui/material';
import { PaginationComponentStyle } from './index.style';
import { DropdownComponent } from 'components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface IPaginationComponentProps {
  onChangeRowCount?: (count: number) => void,
  onNextPage?: () => void,
  onPreviousPage?: () => void,
  limit?: number,
  page?: number,
  totalPages?: number
}

export const PaginationComponent: React.FC<IPaginationComponentProps> = (props) => {
  const {
    onChangeRowCount,
    onNextPage,
    onPreviousPage,
    limit,
    totalPages,
    page
  } = props;

  return (
    <PaginationComponentStyle>
      <DropdownComponent
        className='row-count-dropdown'
        onChange={(e) => { onChangeRowCount && onChangeRowCount(e.target.value as number); }}
        defaultValue={limit}
        renderValue={(value) => (
          <Box className='show-rows-dropdown'>
            <Typography variant='h6'>Show rows:</Typography>
            <Typography variant='body2'>{value}</Typography>
          </Box>
        )}
      >
        <MenuItem value="10">10</MenuItem>
        <MenuItem value="20">20</MenuItem>
        <MenuItem value="50">50</MenuItem>
        <MenuItem value="100">100</MenuItem>
      </DropdownComponent>
      <IconButton
        onClick={() => { onNextPage && onNextPage(); }}
        disabled={page == 1}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </IconButton>
      <Typography variant='body2'>Page {page} of {totalPages && totalPages}</Typography>
      <IconButton
        onClick={() => { onPreviousPage && onPreviousPage(); }}
        disabled={totalPages == page}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </IconButton>
    </PaginationComponentStyle>
  );
};
