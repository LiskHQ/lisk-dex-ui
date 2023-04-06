import { withLayout } from "@moxy/next-layout";
import { Layout } from "components/common";
import SwapToken from "../../components/token-swap/swap-tokens/card/card";

const Swap = () => {
  return (
    <>
      <SwapToken />
    </>
  );
};

export default withLayout(<Layout />)(Swap);
