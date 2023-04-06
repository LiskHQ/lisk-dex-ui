import { withLayout } from "@moxy/next-layout";
import { Layout } from "components/common";
import LiquidityHome from "../../components/pool/liquidity/home/liquidity-home"


const CreatePoolHome = () => {
  return (
    <>
      <LiquidityHome />
    </>
  )
}

export default withLayout(<Layout />)(CreatePoolHome);