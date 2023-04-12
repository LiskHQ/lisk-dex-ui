import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVote } from "models";
import { mockVotes } from "__mock__";

type StateType = {
  votesLimit: number,
  votesTotal: number,
  votesTotalPages: number,
  votes: IVote[]
  error: any,
};

const initialState: StateType = {
  votesLimit: 10,
  votesTotal: 0,
  votesTotalPages: 0,
  votes: [],
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
    getVotesByProposal(state: any, action: PayloadAction<number>) {
      const newVotes = mockVotes.slice(0, (action.payload + 1) * state.votesLimit);
      state.votesTotal = mockVotes.length;
      state.votesTotalPages = ~~mockVotes.length / state.votesLimit;
      state.votes = [...newVotes];
    },

    vote(state: any, action: PayloadAction<IVote>) {
      const index = state.votes.findIndex(el => el.user === action.payload.user);
      if (index >= 0)
        state.votes[index] = action.payload;
      else
        state.votes = [...state.votes, action.payload]
    }
  },
});

export const actions = proposalSlice.actions;
export const reducer = proposalSlice.reducer;

