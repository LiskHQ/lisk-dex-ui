import { MenuItem, ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { lightTheme } from 'styles/theme';
import { DropdownComponent } from '.';

const props = {
  label: 'Test Label',
  onChange: jest.fn(),
  value: 2
};

function renderComponent() {
  return render(
    <ThemeProvider theme={lightTheme}>
      <DropdownComponent {...props}>
        <MenuItem value={1}>Option 1</MenuItem>
        <MenuItem value={2}>Option 2</MenuItem>
        <MenuItem value={3}>Option 3</MenuItem>
      </DropdownComponent>
    </ThemeProvider>
  );
}

describe('Dropdown component', () => {
  it('checks if the component matches the snapshot', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it('renders label', () => {
    renderComponent();
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });
});