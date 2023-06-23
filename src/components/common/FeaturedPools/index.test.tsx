import { ThemeProvider } from '@mui/material';
import { fireEvent, render } from '@testing-library/react';
import { IFeaturedPoolsProps, FeaturedPools } from './index';
import React from 'react';
import { lightTheme } from 'styles/theme';

function renderComponent(props: IFeaturedPoolsProps) {
  return render(
    <ThemeProvider theme={lightTheme}>
      <FeaturedPools {...props} />
    </ThemeProvider>
  );
}

describe('FeaturedPools component', () => {
  const mockProps: IFeaturedPoolsProps = {
    onSelectPool: jest.fn(),
  };
  it('checks if the component matches the snapshot', () => {
    const { container } = renderComponent(mockProps);
    expect(container).toMatchSnapshot();
  });

  it('check click feature pool item work', () => {
    const { getByTestId } = renderComponent(mockProps);
    fireEvent.click(getByTestId('feature-pool-item-0'));

    expect(mockProps.onSelectPool).toBeCalledWith('0');
  });
});

