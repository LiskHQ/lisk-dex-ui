import { withLayout } from "@moxy/next-layout";
import { Layout } from "components/common";
import AddLiquidity from "../../components/pool/liquidity/common/add-liquidity"


const CreateAddLiquidity = () => {
  return (
    <>
      <AddLiquidity />
    </>
  )
}

export default withLayout(<Layout />)(CreateAddLiquidity);