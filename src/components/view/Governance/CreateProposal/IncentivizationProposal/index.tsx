import { Box, Grid, MenuItem, Typography } from "@mui/material"
import { useTheme } from "@mui/styles"
import { DropdownComponent, InputComponent, PoolItem, PopoverComponent } from "components"
import { HelpIcon } from "imgs/icons"
import { IPoolItem } from "models"
import { useState } from "react"
import { allowDigitOnly } from "utils"
import { IncentivizationProposalStyle } from "./index.style"

export const poolItems: IPoolItem[] = [
  {
    id: '1',
    chain1: 'LSK',
    chain2: 'DEU',
    rate: 0.3,
    amount: 12.2,
  },
  {
    id: '2',
    chain1: 'KLP',
    chain2: 'RGB',
    rate: 0.1,
    amount: 11.4,
  },
  {
    id: '3',
    chain1: 'DEU',
    chain2: 'FAE',
    rate: 0.3,
    amount: 17.6,
  },
  {
    id: '4',
    chain1: 'RGB',
    chain2: 'FAE',
    rate: 0.1,
    amount: 11.4,
  }
]

interface IProps {
  className?: string,
}

export const IncentivizationProposal: React.FC<IProps> = (props) => {
  const { className } = props;
  const theme = useTheme();
  const [poolID, setPoolID] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openPoolIdHelp, setOpenPoolIdHelp] = useState<boolean>(false);
  const [openMultiplierHelp, setOpenMultiplierHelp] = useState<boolean>(false);

  const onChangePoolID = (value: string | number) => {
    setPoolID(value as string);
  }

  const onClickPoolIDHelp = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenPoolIdHelp(true);
  }

  const onClickMultiplierHelp = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenMultiplierHelp(true);
  }

  return (
    <IncentivizationProposalStyle className={className}>
      <Grid container spacing={3} className="proposal-incentivization">
        <Grid item lg={6}>
          <DropdownComponent
            className="proposal-pool-id"
            label={
              <>
                Select a pool ID <HelpIcon
                  onClick={onClickPoolIDHelp}
                />
              </>
            }
            onChange={(e) => { onChangePoolID(e.target.value); }}
            value={poolID}
            renderValue={(value) => {
              const item = poolItems.find(el => el.id == value);
              if (item)
                return (<PoolItem data={item} />);
              else
                return (<Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '2rem',
                    color: theme.text.placeholder
                  }}>
                  <Typography variant="body1">Select a pool</Typography>
                </Box>
                );
            }}
          >
            <MenuItem value="10" disabled>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '2rem',
                width: '100%',
              }}>
                <Typography variant="body2">Pools</Typography>
                <Typography variant="body2">TVL</Typography>
              </Box>
            </MenuItem>
            {
              poolItems.map(item => (
                <MenuItem
                  key={item.id}
                  value={item.id}
                >
                  <PoolItem data={item} />
                </MenuItem>
              ))
            }
          </DropdownComponent>
          <PopoverComponent
            open={openPoolIdHelp}
            anchorEl={anchorEl}
            onClose={() => { setOpenPoolIdHelp(false); }}
          >
            <Typography variant="body2">Incentivization proposals must include a pool ID of the incentivized pool.</Typography>
          </PopoverComponent>
          <PopoverComponent
            open={openMultiplierHelp}
            anchorEl={anchorEl}
            onClose={() => { setOpenMultiplierHelp(false); }}
          >
            <Typography variant="body2">The multiplier of the pool to be incentivized in case of incentivization proposal.</Typography>
          </PopoverComponent>
        </Grid>
        <Grid item lg={6}>
          <InputComponent
            label={
              <>
                Add a multiplier  <HelpIcon
                  onClick={onClickMultiplierHelp}
                />
              </>
            }
            type="number"
            min={0}
            placeholder="Add multiplier"
            onKeyDown={allowDigitOnly}
          />
        </Grid>
      </Grid>
    </IncentivizationProposalStyle >
  )
}