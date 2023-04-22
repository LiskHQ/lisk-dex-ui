import { Box, Grid, Typography } from "@mui/material";
import { FeeTiersStyle } from "./index.style";
import { RadioComponent } from "components";
import { useEffect, useState } from "react";
import cn from "classnames";

export interface IFeeTiersProps {
  tierValue: number,
  onChange: (value: number) => void,
}

const tiers = [
  {
    percent: 0.01,
    description: 'Best for very stable pairs.'
  },
  {
    percent: 0.05,
    description: 'Best for very stable pairs.'
  },
  {
    percent: 0.3,
    description: 'Best for very stable pairs.'
  },
  {
    percent: 1,
    description: 'Best for exotic pairs.'
  }
]

export const FeeTiers: React.FC<IFeeTiersProps> = (props) => {
  const { tierValue, onChange } = props;
  const [value, setValue] = useState<number>(tierValue);

  useEffect(() => {
    onChange && onChange(value);
  }, [value]);

  useEffect(() => {
    setValue(tierValue);
  }, [tierValue])

  return (
    <FeeTiersStyle className="fee-tiers">
      <Grid container spacing={1}>
        {
          tiers.map(tier => (
            <Grid key={tier.percent} item xs={3}>
              <Box
                className={
                  cn({
                    "fee-tier": true,
                    "selected": tier.percent === value
                  })}
                onClick={() => { setValue(tier.percent); }}
              >
                <Typography variant="body2">{tier.percent}%</Typography>
                <RadioComponent checked={tier.percent === value} />
                <Typography className="fee-tier-description" variant="body2">{tier.description}</Typography>
              </Box>
            </Grid>
          ))
        }
      </Grid>
    </FeeTiersStyle>
  )
}