import { ProposalType } from "consts";

export interface IProposal {
  author: string,
  proposalType: ProposalType,
  poolID?: string,
  multiplier?: number,
  title: string,
  summary: string,
  description: string,
  link?: string
}