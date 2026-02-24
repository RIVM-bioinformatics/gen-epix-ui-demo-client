import * as child from 'child_process';
import { resolve } from 'path';
import { readFileSync } from 'fs';

import react from '@vitejs/plugin-react-swc';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgr from 'vite-plugin-svgr';
import type { TestUserConfig as UserConfigVitest } from 'vitest/node';
import {
  normalizePath,
  type UserConfig,
} from 'vite';

import packageJson from './package.json';

const commitHash = child.execSync('git rev-parse --short HEAD').toString();
const isGenEpixUiLinked = packageJson.dependencies['@gen-epix/ui'].startsWith('file:');

const proxyThrottleConfig: { [key: string]: number } = {
  // '/v1/example': 5000,
};

const proxyResponseCodeConfig: {
  [key: string]: {
    code: number;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  };
} = {
  // '/v1/example': {
  //   code: 500,
  //   method: 'DELETE',
  // },
};

// https://vitejs.dev/config/
export default {
  define: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __COMMIT_HASH__: JSON.stringify(commitHash.trim()),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __PACKAGE_JSON_VERSION__: JSON.stringify((packageJson.version as unknown as string).trim()),
  },
  plugins: [
    react({ tsDecorators: true }),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    svgr(),
    viteStaticCopy({
      targets: [
        {
          src: [
            './src/locale',
          ],
          dest: './',
        },
        {
          src: [
            normalizePath(resolve(__dirname, isGenEpixUiLinked ? '../gen-epix-ui/src/locale' : './node_modules/@gen-epix/ui/dist/locale')),
          ],
          dest: './locale',
          rename: 'gen-epix-ui',
        },
      ],
    }),
  ],
  html: {
    cspNonce: '**CSP_NONCE**',
  },
  resolve: {
    alias: [
      // All peer dependencies of @gen-epix/ui should be aliased to the local node_modules version
      // This is to prevent issues with multiple versions of the same package
      { find: '@emotion/react', replacement: resolve('./node_modules/@emotion/react') },
      { find: '@emotion/styled', replacement: resolve('./node_modules/@emotion/styled') },
      { find: '@emotion/cache', replacement: resolve('./node_modules/@emotion/cache') },
      { find: '@mui/(.*)', replacement: resolve('./node_modules/@mui/$1') },
      { find: 'i18next', replacement: resolve('./node_modules/i18next') },
      { find: 'react-dom', replacement: resolve('./node_modules/react-dom') },
      { find: 'react-i18next', replacement: resolve('./node_modules/react-i18next') },
      { find: 'react', replacement: resolve('./node_modules/react') },
    ],
  },
  build: {
    rollupOptions: {
      input: {
        app: resolve(__dirname, 'index.html'),
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      tsconfig: 'tsconfig.json',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    testTimeout: 5000,
  },
  server: {
    open: true,
    port: 5010,
    https: process.env.NODE_ENV === 'development' && {
      key: readFileSync('./cert/key.pem'),
      cert: readFileSync('./cert/cert.pem'),
    },
    proxy: {
      '^\\/v[\\d\\.]+\\/.*': {
        target: 'https://0.0.0.0:8000',
        changeOrigin: true,
        secure: false,
        bypass: async (req, res) => {
          const throttle = proxyThrottleConfig[req.url];
          const responseConfig = proxyResponseCodeConfig[req.url];

          if (throttle) {
            await new Promise((r) => setTimeout(r, throttle));
          }
          if (responseConfig?.method === req.method) {
            res.statusCode = responseConfig.code;
            res.end();
            return false;
          }
        },
      },
    },
  },
} satisfies UserConfig & { test: UserConfigVitest };
