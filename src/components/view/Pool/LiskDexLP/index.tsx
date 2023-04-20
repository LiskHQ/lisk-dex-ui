import { Box, Typography } from "@mui/material"
import { LiskDexLPStyle } from "./index.style"

export const LiskDexLP: React.FC = () => {
  return (
    <LiskDexLPStyle>
      <Box className="lisk-dex-lp-title">
        <Typography variant="h4">Your LiskDEX LP</Typography>
      </Box>
    </LiskDexLPStyle>
  )
}