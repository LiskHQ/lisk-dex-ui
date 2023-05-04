import { withLayout } from "@moxy/next-layout";
import { Layout } from "components/common";
import RemoveLiquidity from "../../components/pool/liquidity/remove-liquidity/remove-liquidity";


const CreateAddLiquidity = () => {
  return (
    <>
      <RemoveLiquidity />
    </>
  )
}

export default withLayout(<Layout />)(CreateAddLiquidity);