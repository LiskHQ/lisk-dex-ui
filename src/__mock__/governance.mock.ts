import { ProposalType } from "consts";
import { IPoolItem, IProposal } from "models";

export const mockProposal: IProposal = {
  author: "Author",
  proposalType: ProposalType.PoolIncentivization,
  poolID: "1",
  multiplier: 8,
  title: "title",
  summary: "summary",
  description: "description",
  link: "description"
}

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