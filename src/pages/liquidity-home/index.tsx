import { withLayout } from "@moxy/next-layout";
import General from "../../components/layout/public/general";
import LiquidityHome from "../../components/pool/liquidity/home/liquidity-home"


const CreatePoolHome = () => {
    return (
        <>
            <LiquidityHome />
        </>
    )
}

export default withLayout(<General />)(CreatePoolHome);