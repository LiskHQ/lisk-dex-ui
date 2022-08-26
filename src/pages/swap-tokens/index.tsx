import { withLayout } from "@moxy/next-layout";
import General from "../../components/layout/public/general";
import SwapToken from "../../components/token-swap/swap-tokens/card/card";

const Swap = () => {
  return (
    <>
      <SwapToken />
    </>
  );
};

export default withLayout(<General />)(Swap);
