import React from 'react';
import HandleLiquidityList from './handle-liquidity-list';
import { fireEvent, render } from "@testing-library/react";


const renderComponent = () => {
    return render(
      <HandleLiquidityList />
    );
  };

  describe("HandleLiquidityList component", () => {
    it("checks if the component matches the snapshot", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });  

    it("checks if  search bar is working correctly on entring textr", () => {

        const wrapper = renderComponent();
        const downButton = wrapper.getByTestId("arrow-down-button");
        fireEvent.click(downButton);
        const tokenButtonText = wrapper.getByText("Pooled ETH");
        expect(tokenButtonText).toContainHTML("Pooled ETH");        
      });
      it("checks if  search bar is working correctly on entring textr", () => {

        const wrapper = renderComponent();
        const downButton = wrapper.getByTestId("arrow-down-button");
        fireEvent.click(downButton);    
        const increaseLiquidityButton = wrapper.getByTestId("increase-liquidity-button");
        fireEvent.click(increaseLiquidityButton);
        const increaseLiquidityText = wrapper.getByText("Increase Liquidity");
        expect(increaseLiquidityText).toContainHTML("Increase Liquidity");   
      });
});
