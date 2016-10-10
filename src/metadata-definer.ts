import { Type } from './interfaces';

export class MetadataDefiner {
    defineDependencies(Class: Type, dependencies: Type[]) {
        let parameters: Type[] = Reflect.getMetadata('design:paramtypes', Class);
        if (parameters) {
            parameters.forEach((p, index) => {
                if (dependencies[index] !== p) {
                    throw new Error(`Type ${Class.name} already has reflection metadata emitted.  Cannot redefine with different values.`);
                }
            });

            return;
        }

        Reflect.defineMetadata('design:paramtypes', dependencies, Class);
    }
}

