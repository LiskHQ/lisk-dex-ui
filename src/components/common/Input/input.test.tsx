import { ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';
import React from 'react';
import { lightTheme } from 'styles/theme';
import { InputComponent } from '.';

function renderComponent() {
  return render(
    <ThemeProvider theme={lightTheme}>
      <InputComponent />
    </ThemeProvider>
  );
}

describe('Input component', () => {
  it('checks if the component matches the snapshot', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });
});