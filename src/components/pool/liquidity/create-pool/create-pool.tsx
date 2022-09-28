import CreatePoolText from "./create-pool-text"
import PriceInputBox from "./price-input-box"

export default function CreatePool(props:any){
    return (
        <>
        <CreatePoolText />
        <PriceInputBox />
        <PriceInputBox token1={props.token1} token2={props.token2} defaultText={"Current LSK per ETH"} />
        </>        
    )
}