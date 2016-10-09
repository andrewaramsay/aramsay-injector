import 'core-js';
if (!Reflect.defineMetadata) {
	require('reflect-metadata');
}

export * from './src/decorators';
export * from './src/interfaces';
export * from './src';
