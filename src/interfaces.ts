
export interface ClassFactory {
    (): any;
}

export type FactoryToken = Type | string | symbol;

export interface Type { 
    new(...args: any[]): any;
}

export interface InjectableConfig {
    singleton?: boolean
}
