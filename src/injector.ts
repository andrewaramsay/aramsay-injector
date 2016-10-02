import 'core-js';
import 'reflect-metadata';

const factoryMetadataKey = 'aramsay-injector:factory';

export interface InjectableConfig {
    singleton?: boolean
}

export class Injector {
    static instance: Injector = new Injector();
    
    constructor() {
    }

    registerType(Class: any, config: InjectableConfig) {
        let parameters = this.getParameterMetadata(Class);

        let instance: any;
        let factory = () => {
            if (config.singleton && instance) {
                return instance;
            }
            
            var paramInstances = parameters.map(paramClass => this.get(paramClass));
            instance = new Class(...paramInstances);
            return instance;
        };
        Reflect.defineMetadata(factoryMetadataKey, factory, Class);
    
    }

    get(Class: any) {
        let factory = Reflect.getMetadata(factoryMetadataKey, Class);
        if (!factory) {
            factory = this.checkSafeCreate(Class);
        }

        if (!factory) {
            throw new Error(`Unknown class ${Class.name}.  Are you missing the @Injectable() decorator?`);
        }
        

        return factory();
    }

    private checkSafeCreate(Class: any): () => any {
        let parameters = this.getParameterMetadata(Class);
        if (parameters.length === 0) {
            return () => new Class();
        }
        return undefined;
    }

    private getParameterMetadata(Class: any): Function[] {
        let parameters: Function[] = Reflect.getMetadata('design:paramtypes', Class);
        return parameters || [];
    }
}