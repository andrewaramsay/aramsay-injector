
export interface ClassFactory {
    (): any;
}

export type FactoryToken = Type | string | symbol;

export interface Type { 
    new(...args: any[]): any;
}

export enum InstanceMode {
    SingleInstance,
    InstancePerDependency,
    InstancePerResolution
}

export interface InjectableConfig {
    instanceMode?: InstanceMode;
}
