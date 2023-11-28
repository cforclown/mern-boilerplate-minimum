import { Socket } from 'socket.io';
import { ObjectSchema } from 'joi';
import { IUser } from '../modules';
export interface ExtSocket extends Socket {
    userContext: {
        user: IUser;
    };
}
export interface IEventPayloadWrapper<T> {
    data: T;
}
type SocketIOEventHandler<T> = (payload?: IEventPayloadWrapper<T>) => Promise<void>;
export type EventHandlerWithPayload<T> = (socket: ExtSocket, payload: IEventPayloadWrapper<T>) => Promise<void>;
export type EventHandlerWithoutPayload = (socket: ExtSocket) => Promise<void>;
export type EventHandler<T> = EventHandlerWithPayload<T> | EventHandlerWithoutPayload;
export declare const socketioEventHandlerWrapper: <T, H extends EventHandler<T>>(eventName: string, socket: ExtSocket, handler: H, schema?: ObjectSchema) => SocketIOEventHandler<T> | (() => Promise<void>);
export declare const registerEvent: <T, H extends EventHandler<T>>(socket: ExtSocket, eventName: string, handler: H, schema?: ObjectSchema) => void;
export {};
