import { withLayout } from "@moxy/next-layout";
import General from "../../components/layout/public/general";
import AddLiquidity from "../../components/pool/liquidity/common/add-liquidity"


const CreateAddLiquidity = () => {
    return (
        <>
            <AddLiquidity />
        </>
    )
}

export default withLayout(<General />)(CreateAddLiquidity);