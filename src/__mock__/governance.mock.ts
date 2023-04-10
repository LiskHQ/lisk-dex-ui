import { ProposalStatus, ProposalType } from "consts";
import { IPoolItem, IProposal } from "models";

export const mockProposal: Pick<
  IProposal,
  'author' | 'proposalType' | 'poolID' | 'multiplier' | 'title' | 'summary' | 'description' | 'link'
> = {
  author: "Author",
  proposalType: ProposalType.PoolIncentivization,
  poolID: "pool1",
  multiplier: 8,
  title: "Deploy Lisk DEX to Bridges on V2",
  summary: "summary",
  description: "description",
  link: "description"
}

export const mockProposals: IProposal[] = [
  {
    id: "proposal1",
    author: "Author",
    proposalType: ProposalType.PoolIncentivization,
    poolID: "pool1",
    multiplier: 8,
    title: "Deploy Lisk DEX to Bridges on V2",
    summary: "summary",
    description: "description",
    link: "description",
    status: ProposalStatus.Active,
  }
]

export const mockPoolItems: IPoolItem[] = [
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
