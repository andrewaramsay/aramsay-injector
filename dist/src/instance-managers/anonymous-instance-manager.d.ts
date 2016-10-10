import { InstanceManager } from './instance-manager';
import { ClassFactory } from '../interfaces';
export declare class AnonymousInstanceManager extends InstanceManager {
    private classFactory;
    constructor(classFactory: ClassFactory);
    getInstance(): Object;
}
