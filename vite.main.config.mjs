import { defineConfig } from 'vite';
import path from "path-browserify";
// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    // Some libs that can run in both Web and Node.js, such as `axios`, we need to tell Vite to build them in Node.js.
    browserField: false,
    conditions: ['node'],
    mainFields: ['module', 'jsnext:main', 'jsnext'],
    alias: {
      path: "path-browserify",
    },
  },
  build: {
    commonjsOptions: {transformMixedEsModules:true}
  }
});
