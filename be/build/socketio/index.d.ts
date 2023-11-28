/// <reference types="node" />
import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import SIOController from './sio.controller';
declare function initSocketIO(server: HttpServer, sioController: SIOController): Server;
export default initSocketIO;
