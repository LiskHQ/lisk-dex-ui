import React from 'react';
import AddLiquidity from './add-liquidity';
import { screen, render } from "@testing-library/react";


jest.mock('./add-liquidity/deposit-amounts/deposit-amounts.tsx', () => ({
    __esModule: true,
    default: jest.fn().mockReturnValue('deposit-amounts'),
  }));

  jest.mock('./add-liquidity/set-price-range/set-price-range.tsx', () => ({
    __esModule: true,
    default: jest.fn().mockReturnValue('set-price-range'),
  }));
  
  const renderComponent = () => {
    return render(
      <AddLiquidity />
    );
  };

  
  describe("AddLiquidity component", () => {
    it("checks if the component matches the snapshot", () => {
      renderComponent();
      expect(screen.getByText('deposit-amounts')).toBeInTheDocument();
      expect(screen.getByText('set-price-range')).toBeInTheDocument();
    });  
});
