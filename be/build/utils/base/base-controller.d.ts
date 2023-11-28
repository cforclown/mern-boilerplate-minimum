import { Request } from 'express';
import { BaseService } from './base-service';
export declare abstract class BaseController<T> {
    protected readonly service: BaseService<T>;
    constructor(service: BaseService<T>);
    get({ params }: Request): Promise<T>;
    getAll(): Promise<T[]>;
    create({ body }: Request): Promise<T>;
    update({ body }: Request): Promise<T>;
    delete({ params }: Request): Promise<T>;
}
