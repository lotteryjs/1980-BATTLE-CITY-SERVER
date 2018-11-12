import { IConfigOptions } from '../types';

const config: IConfigOptions = {
  version: '1.0',
  serve: {
    port: (process.env.EXPOSE_PORT && parseInt(process.env.EXPOSE_PORT)) || 8080,
  },
};

export default config;
