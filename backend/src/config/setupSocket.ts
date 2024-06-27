import { createAdapter } from '@socket.io/redis-adapter';
import http from 'http';
import { createClient } from 'redis';
import { Server } from 'socket.io';
import { CLIENT_URL, REDIS_URL } from './constants';
import logger from './logger';

const startSocketServer = async (httpServer: http.Server) => {
  const io: Server = new Server(httpServer, {
    cors: {
      origin: CLIENT_URL,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    }
  });
  const pubClient = createClient({ url: REDIS_URL });
  const subClient = pubClient.duplicate();
  await Promise.all([pubClient.connect(), subClient.connect()]);
  socketConnection(io);
  io.adapter(createAdapter(pubClient, subClient));
};

const socketConnection = (io: Server) => {
  io.on('connection', (socket) => {
    logger('socket').info(`Socket connected: ${socket.id}`);
    socket.on('setup', (userData) => {
      socket.join(userData._id);
      socket.emit('connected');
    });
  });
};

export default startSocketServer;
