import { mergeConfig } from 'vite';
import baseConfig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    server: {
      open: true,
      port: 3006,
      fs: {
        strict: true,
      },
    },
  },
  baseConfig
);
