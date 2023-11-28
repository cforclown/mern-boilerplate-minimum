import { BaseDataAccessObject } from './base-dao-mongo';
export declare abstract class BaseService<T> {
    protected readonly dao: BaseDataAccessObject<T>;
    constructor(dao: BaseDataAccessObject<T>);
    get(id: string): Promise<T | null>;
    getAll(): Promise<T[]>;
    create(payload: Record<string, any>): Promise<T>;
    update(payload: Record<string, any>): Promise<T | null>;
    delete(id: string): Promise<T | null>;
}
