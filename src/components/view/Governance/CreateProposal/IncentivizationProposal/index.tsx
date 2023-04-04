import { Grid, MenuItem, Typography } from "@mui/material"
import { DropdownComponent, InputComponent, PoolItem } from "components"
import { IPoolItem } from "models"
import { useState } from "react"
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
  const [poolID, setPoolID] = useState<string>('');

  const onChangePoolID = (value: string | number) => {
    setPoolID(value as string);
  }
  return (
    <IncentivizationProposalStyle className={className}>
      <Grid container spacing={3} className="proposal-incentivization">
        <Grid item lg={6}>
          <DropdownComponent
            className="proposal-pool-id"
            label="Select a pool ID"
            onChange={(e) => { onChangePoolID(e.target.value); }}
            value={poolID}
          >
            <MenuItem value="" disabled>
              <PoolItem />
            </MenuItem>
            {
              poolItems.map(item => (
                <MenuItem key={item.id} value={item.id}>
                  <PoolItem data={item} />
                </MenuItem>
              ))
            }
          </DropdownComponent>
        </Grid>
        <Grid item lg={6}>
          <InputComponent
            label="Add a multiplier"
            placeholder="Add multiplier"
          />
        </Grid>
      </Grid>
    </IncentivizationProposalStyle >
  )
}