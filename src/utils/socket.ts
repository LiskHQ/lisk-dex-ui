import { io, Socket } from 'socket.io-client';

const connectionPool: { [key: string]: Socket } = {};

export const socket = io(`${process.env.NEXT_PUBLIC_WS_URL}`, {
  transports: ['websocket']
});