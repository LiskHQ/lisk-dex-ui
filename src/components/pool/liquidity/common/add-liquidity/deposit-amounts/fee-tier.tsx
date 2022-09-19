import { makeStyles } from "@mui/styles";
import { theme, variables } from "../../../../../../theme";

const useStyles = makeStyles({
    feeTier: {
        textAlign: "left",
        fontSize: theme.typography.h3.fontSize,
        fontWeight: "600",  
        color: variables.black      
    },
    buttonsList: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        gap: "15px",
    },
    button: {
        textAlign: "left",
        border: "1px solid #e0e2f1",
        borderRadius: "4px",
        backgroundColor: "transparent",
    }
})

const feeTierlist = [
    {
        value: "0.01%",
        description: "best for very stable pairs"
    },
    {
        value: "0.05%",
        description: "best for stable pairs"
    },
    {
        value: "0.3%",
        description: "best for stable pairs"
    },
    {
        value: "1%",
        description: "best for exotic pairs"
    }
]
export default function FeeTier(){
    const classes = useStyles();
    return(
        <section >
            <div>
            <h3 className={classes.feeTier}>Fee Tier</h3>            
            </div>
            <div className={classes.buttonsList}>
            {feeTierlist.map((feeListItem)=>{
             const {value,description} = feeListItem;
             return(
                <button className={classes.button}key={value}>
                    <h3>
                    {value}
                    </h3>
                    <h4>
                    {description}
                    </h4>  
                </button>
             )  
        })
        }
            </div>            
        </section>
        
        
    )
}