import { Socket } from 'socket.io';
import SIOService from './sio.service';
declare class SIOController {
    static readonly INSTANCE_NAME = "sioController";
    sioService: SIOService;
    constructor(sioService: SIOService);
    authenticate(socket: Socket, next: (args?: any) => void): Promise<void>;
    connection(socket: any): Promise<void>;
}
export default SIOController;
