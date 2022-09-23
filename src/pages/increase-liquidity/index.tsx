import { withLayout } from "@moxy/next-layout";
import General from "../../components/layout/public/general";
import AddLiquidity from "../../components/pool/liquidity/common/add-liquidity"
import IncreaseLiquidity from "../../components/pool/liquidity/increase-liquidity/increase-liquidity";


const CreateAddLiquidity = () => {
    return (
        <>
            <IncreaseLiquidity  token1Id={"LSK"} token2Id={"ETH"}/>
        </>
    )
}

export default withLayout(<General />)(CreateAddLiquidity);