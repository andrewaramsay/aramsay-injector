import { InstanceManager } from './instance-manager';
import { ClassFactory } from '../interfaces';

export class AnonymousInstanceManager extends InstanceManager {
    constructor(private classFactory: ClassFactory) {
        super();
    }

    getInstance(): Object {
        return this.classFactory();
    }
}