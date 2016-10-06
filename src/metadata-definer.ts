import 'reflect-metadata';
import { Injector } from './injector';

export class MetadataDefiner {
    constructor(
        private injector?: Injector) {
    }
    
    defineDependencies(Class: any, dependencies: any[], singleton?: boolean) {
        let parameters: any[] = Reflect.getMetadata('design:paramtypes', Class);
        if (parameters) {
            parameters.forEach((p, index) => {
                if (dependencies[index] !== p) {
                    throw new Error(`Type ${Class.name} already has reflection metadata emitted.  Cannot redefine with different values.`);
                }
            });

            return;
        }

        Reflect.defineMetadata('design:paramtypes', dependencies, Class);

        if (this.injector) {
            this.injector.registerType(Class, { singleton });
        }
    }
}