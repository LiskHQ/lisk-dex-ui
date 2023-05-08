import { IPool } from "models";
import { mockTokens } from "./swap.mock";

export const mockPool: IPool = {
  token1: mockTokens[0],
  token2: mockTokens[1],
  token1Amount: 1862,
  token2Amount: 0.045,
  share: 0.085,
}

export const mockPools: IPool[] = [
  mockPool,
]