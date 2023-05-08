import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPool } from "models";

type StateType = {
  pools: IPool[],
  gettingPools: boolean,
  gotPools: boolean,
  creatingPool: boolean,
  createdPool: boolean,
  error: any,
};

const initialState: StateType = {
  pools: [],
  gettingPools: false,
  gotPools: false,

  creatingPool: false,
  createdPool: false,
  error: { message: '' },
};

const poolSlice = createSlice({
  name: "pool",
  initialState: initialState,
  reducers: {
    /**
     * pool
     */
    //create pool
    createPool(state, action: PayloadAction<any>) {
      state.creatingPool = true;
      state.createdPool = false;
    },
    createPoolSuccess(state, action: PayloadAction<any>) {
      state.creatingPool = false;
      state.createdPool = true;
      state.pools = [...state.pools, action.payload];
    },
    createPoolFailure(state, action: PayloadAction<any>) {
      state.creatingPool = false;
      state.createdPool = false;
      state.error = action.payload;
    },

    //get pools
    getPools(state) {
      state.gettingPools = true;
      state.gotPools = false;
    },
    getPoolsSuccess(state) {
      state.gettingPools = false;
      state.gotPools = true;
      // state.pools = [...state.pools];
    },
    getPoolsFailure(state, action: PayloadAction<any>) {
      state.gettingPools = false;
      state.gotPools = false;
      state.error = action.payload;
    },
  },
});

export const actions = poolSlice.actions;
export const reducer = poolSlice.reducer;

