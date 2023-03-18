import { withLayout } from "@moxy/next-layout";
import General from "../../components/layout/public/general";
import RemoveLiquidity from "../../components/pool/liquidity/remove-liquidity/remove-liquidity";


const CreateAddLiquidity = () => {
    return (
        <>
            <RemoveLiquidity />
        </>
    )
}

export default withLayout(<General children={undefined} />)(CreateAddLiquidity);