import { Model } from 'mongoose';
export declare abstract class BaseDataAccessObject<T> {
    protected readonly model: Model<T>;
    constructor(model: Model<T>);
    get(id: string): Promise<T | null>;
    getAll(): Promise<T[]>;
    create(payload: Record<string, any> & {
        id?: string;
    }): Promise<T>;
    update(payload: Record<string, any>): Promise<T | null>;
    delete(id: string): Promise<T | null>;
}
