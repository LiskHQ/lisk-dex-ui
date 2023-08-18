import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPool } from 'models';
import { mockPools } from '__mock__/pool.mock';

type StateType = {
  pools: IPool[],
  gettingPools: boolean,
  gotPools: boolean,

  stastics: any,
  gettingStastics: boolean,
  gotStastics: boolean,
  error: any,
};

const initialState: StateType = {
  pools: [...mockPools],
  gettingPools: false,
  gotPools: false,

  stastics: {},
  gettingStastics: false,
  gotStastics: false,

  error: { message: '' },
};

const poolSlice = createSlice({
  name: 'pool',
  initialState: initialState,
  reducers: {
    /**
     * pool
     */

    //get pools
    //eslint-disable-next-line  @typescript-eslint/no-unused-vars
    getPools(state, action) {
      state.gettingPools = true;
      state.gotPools = false;
    },
    getPoolsSuccess(state, action) {
      state.gettingPools = false;
      state.gotPools = true;
      state.pools = [...action.payload.poolsAvailable.poolsAvailable];
    },
    getPoolsFailure(state, action: PayloadAction<any>) {
      state.gettingPools = false;
      state.gotPools = false;
      state.error = action.payload;
    },

    //get stastics
    //eslint-disable-next-line  @typescript-eslint/no-unused-vars
    getStastics(state, action) {
      state.gettingStastics = true;
      state.gotStastics = false;
    },
    getStasticsSuccess(state, action) {
      state.gettingStastics = true;
      state.gotStastics = false;
      state.stastics = action.payload.data;
    },
    getStasticsFailure(state, action) {
      state.gettingStastics = true;
      state.gotStastics = false;
      state.error = action.payload;
    },
  },
});

export const actions = poolSlice.actions;
export const reducer = poolSlice.reducer;

