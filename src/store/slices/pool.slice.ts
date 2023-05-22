import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPool } from 'models';
import { mockPools } from '__mock__/pool.mock';

type StateType = {
  pools: IPool[],
  gettingPools: boolean,
  gotPools: boolean,
  creatingPool: boolean,
  createdPool: boolean,
  updatingPool: boolean,
  updatedPool: boolean,
  error: any,
};

const initialState: StateType = {
  pools: [...mockPools],
  gettingPools: false,
  gotPools: false,

  creatingPool: false,
  createdPool: false,

  updatingPool: false,
  updatedPool: false,
  error: { message: '' },
};

const poolSlice = createSlice({
  name: 'pool',
  initialState: initialState,
  reducers: {
    /**
     * pool
     */
    //create pool
    createPool(state) {
      state.creatingPool = true;
      state.createdPool = false;
    },
    createPoolSuccess(state, action: PayloadAction<any>) {
      state.creatingPool = false;
      state.createdPool = true;
      const pool: IPool = {
        ...action.payload,
        id: Math.random().toString(36).substring(2, 15),
      };
      state.pools = [...state.pools, pool];
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
      //      state.pools = [...mockPools];
    },
    getPoolsFailure(state, action: PayloadAction<any>) {
      state.gettingPools = false;
      state.gotPools = false;
      state.error = action.payload;
    },

    //update pool
    updatePool(state) {
      state.updatingPool = true;
      state.updatedPool = false;
    },
    updatePoolSuccess(state, action: PayloadAction<IPool>) {
      state.updatingPool = false;
      state.updatedPool = true;
      const index = state.pools.findIndex(el => el.id === action.payload.id);
      state.pools[index] = { ...action.payload };
    },
    updatePoolFailure(state) {
      state.updatingPool = false;
      state.updatedPool = false;
    },
  },
});

export const actions = poolSlice.actions;
export const reducer = poolSlice.reducer;

