import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import SelectToken from "./select-token";
import { fireEvent, render } from "@testing-library/react";

const renderComponent = () => {
    return render(
      <SelectToken />
    );
  };

  describe("SearchBox component", () => {
    it("checks if the component matches the snapshot", () => {
      const { container } = renderComponent();
      expect(container).toMatchSnapshot();
    });  

    it("checks if  search bar is working correctly on entring textr", () => {

        const wrapper = renderComponent();
        const searchInput = wrapper.getByTestId("search-input");
        fireEvent.change(searchInput, { target: { value: "BNB" } });
        const tokenButton = wrapper.getByText("BNB");
        expect(tokenButton).toContainHTML("BNB");        
      });


    it("checks if a correct token is selected on click", () => {
        const handleTokenName = jest.fn();
        const handleSelectOpen = jest.fn();
        const handlePopularPairing = jest.fn();
        const wrapper = render(
          <SelectToken handleTokenName={handleTokenName} handleSelectOpen={handleSelectOpen} handlePopularPairing={handlePopularPairing}/>
        ); 
        const tokenButton = wrapper.getByTestId("token-name-BNB");
        fireEvent.click(tokenButton);
        expect(handleTokenName).toHaveBeenCalled();
      });


    it("checks if  correct tokens are selected on popular pairing click", () => {
        const handleTokenName = jest.fn();
        const handleSelectOpen = jest.fn();
        const handlePopularPairing = jest.fn();
        const wrapper = render(
          <SelectToken handleTokenName={handleTokenName} handleSelectOpen={handleSelectOpen} handlePopularPairing={handlePopularPairing}/>
        ); 
        const popularPairing = wrapper.getByTestId("popular-pairing-LSK,BNB");
        fireEvent.click(popularPairing);
        expect(handlePopularPairing).toHaveBeenCalled();
      });

  }); 