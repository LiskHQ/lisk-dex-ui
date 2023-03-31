import {
  Box,
  MenuItem,
  Typography
} from '@mui/material';
import { BankIcon, VoteIcon } from 'imgs/icons';
import { PATHS } from 'consts';
import Link from 'next/link';
import { GovernanceViewStyle } from './index.style';
import { DropdownComponent } from 'components/common/Dropdown';
import { EmptyComponent } from 'components/common/Empty';

export const GovernanceView: React.FC = () => {
  return (
    <GovernanceViewStyle className="governance-page">
      <Box className="governance-banner">
        <Box>
          <Box className="governance-title">
            <Typography variant="h1">
              Governance
            </Typography>
            <BankIcon className="governance-bank-icon" />
          </Box>
          <Typography className="governanace-description" variant="body1">Vote on proposals and make decisions for the future of Lisk DEX ecosystem.</Typography>
        </Box>
        <Box className="governance-vote-image">
          <VoteIcon />
        </Box>
      </Box>

      <Box className="governance-proposals">
        <Typography className="governance-proposals-title" variant="h3">
          Proposals
        </Typography>
        <Typography className="governance-proposals-description" variant="body1">
          Participate in voting regarding the future of Lisk DEX platform. Use the voting power of the native Lisk DEX Tokens across our ecosystem.
        </Typography>
        <Box className="governance-proposals-actions">
          <DropdownComponent
            className="governance-proposals-select"
            value={10}
          >
            <MenuItem value={10}><Typography variant="h6">All proposals</Typography></MenuItem>
          </DropdownComponent>
          <Link href={PATHS.CREATE_PROPOSAL} passHref legacyBehavior>
            <Typography variant="h5" className="governance-proposals-create" data-testid="create-proposal">+ Create a proposal</Typography>
          </Link>
        </Box>
        <Box className="governance-proposals-items">
          <EmptyComponent
            subject="No proposals found."
            description="When proposals are created, they will appear here."
          />
        </Box>
      </Box>
    </GovernanceViewStyle>
  )
}