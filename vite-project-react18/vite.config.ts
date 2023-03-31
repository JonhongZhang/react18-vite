import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteSvgr from "vite-plugin-svgr";

// https://vitejs.dev/config/

import { resolve } from 'path'
import * as path from "path";

const pathResolve = (dir: string): any => {
  return resolve(__dirname, ".", dir)
}

const alias: Record<string, string> = {
  '@': pathResolve("src"),
  // utils: path.resolve(__dirname, 'src/utils/')
}

export default defineConfig({
  plugins: [react(),viteSvgr()],
    resolve: {  // ****************** 路径配置新增
      alias    // ****************** 路径配置新增
    },

})
