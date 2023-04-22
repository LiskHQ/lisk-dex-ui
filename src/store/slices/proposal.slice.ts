import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVote } from "models";
import { mockVotes } from "__mock__";

type StateType = {
  votesLimit: number,
  votesTotal: number,
  votesTotalPages: number,
  votes: IVote[],
  openProposalApproval: boolean,
  error: any,
};

const initialState: StateType = {
  votesLimit: 10,
  votesTotal: 0,
  votesTotalPages: 0,
  votes: [],
  openProposalApproval: false,
  error: { message: '' },
};

const proposalSlice = createSlice({
  name: "proposal",
  initialState: initialState,
  reducers: {
    /**
     * proposal
     */
    //approve a proposal modal
    setOpenProposalApproval(state, action: PayloadAction<any>) {
      state.openProposalApproval = action.payload;
    },
    getVotesByProposal(state, action: PayloadAction<any>) {
      const newVotes = mockVotes.slice(0, (action.payload + 1) * state.votesLimit);
      state.votesTotal = mockVotes.length;
      state.votesTotalPages = ~~mockVotes.length / state.votesLimit;
      state.votes = [...newVotes];
    }
  },
});

export const actions = proposalSlice.actions;
export const reducer = proposalSlice.reducer;

