import 'core-js';
import 'reflect-metadata';

export class Injector {
    static instance: Injector = new Injector();
    
    constructor() {
    }

    registerType(Class: FunctionConstructor) {
        let parameters: Function[] = Reflect.getMetadata('design:paramtypes', Class);
        if (parameters) {
            let factory = () => {
                var paramInstances = parameters.map(paramClass => this.get(paramClass));
                return new Class(...paramInstances);
            };
            Reflect.defineMetadata('factory', factory, Class);
        }
    }

    get(Class: FunctionConstructor) {
        let factory = Reflect.getMetadata('factory', Class);
        if (!factory) {
            throw new Error(`Unknown class ${Class.name}.  Are you missing the @Injectable() decorator?`);
        }

        return factory();
    }

}