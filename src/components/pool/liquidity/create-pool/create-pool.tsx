import CreatePoolText from "./create-pool-text"
import PriceInputBox from "./price-input-box"

export default function CreatePool(){
    return (
        <>
        <CreatePoolText />
        <PriceInputBox/>
        <PriceInputBox  defaultText={"Current LSK per ETH"} />
        </>        
    )
}