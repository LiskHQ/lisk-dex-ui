import { Box, IconButton, Typography } from "@mui/material";
import { PriceRangeStyle } from "./index.style";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

export interface IPriceRangeProps {
  label: string,
  price: number,
  onChange: (value: number) => void,
}

export const PriceRange: React.FC<IPriceRangeProps> = (props) => {
  const { label, price, onChange } = props;
  const [value, setValue] = useState<number>(price);

  useEffect(() => {
    onChange && onChange(value);
  }, [value]);

  return (
    <PriceRangeStyle className="set-price-range-value">
      <Typography className="price-range-value-label" variant="body2">{label}</Typography>
      <Box className="price-range-value">
        <IconButton onClick={() => { setValue((value - 0.1) < 0 ? value : (value - 0.1)); }}>
          <FontAwesomeIcon icon={faMinus} />
        </IconButton>
        <Typography variant="subtitle1">{value.toFixed(4)}</Typography>
        <IconButton onClick={() => { setValue(value + 0.1); }}>
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>
      </Box>
      <Typography variant="body2">-</Typography>
    </PriceRangeStyle>
  )
}