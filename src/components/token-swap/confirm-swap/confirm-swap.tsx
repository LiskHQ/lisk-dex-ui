import {
  Button,
  ButtonProps,
  Card,
  CardContent,
  dividerClasses,
  List,
  ListItem,
  styled,
} from "@mui/material";
import { variables } from "../../../theme";

export default function ConfirmSwap(props: any) {
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    width: "100%",
    color: variables.primary.superPurple[500],
    backgroundColor: variables.primary.superPurple[500],
    "&:hover": {
      backgroundColor: variables.primary.lighter[700],
    },
  }));

  const printConfirmSwap = () => {
    if (props.handleTokenSwapForm != null) {
      return (
        <>
          <div>Token1 = {props.handleTokenSwapForm.token1}</div>
          <div>Token2 = {props.handleTokenSwapForm.token2}</div>
          <div>Amount1 = {props.handleTokenSwapForm.amount1}</div>
          <div>Amount2 = {props.handleTokenSwapForm.amount2}</div>
          <div>
            Slippeage Tolerance = {props.handleTokenSwapForm.slippeageTolerance}
          </div>
          <div>
            Transaction Deadline ={" "}
            {props.handleTokenSwapForm.transactionDeadline}
          </div>
        </>
      );
    } else {
      return "Found no data";
    }
  };

  return (
    <Card>
      <CardContent>
        <div>{printConfirmSwap()}</div>
      </CardContent>
      <ColorButton
        variant="contained"
        size="medium"
        onClick={() => {
          props.handleConfirmSwapClick(false);
        }}
      >
        Confirm Swap
      </ColorButton>
    </Card>
  );
}
