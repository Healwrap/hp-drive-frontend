// @ts-nocheck
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import eslintPlugin from 'vite-plugin-eslint'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { envParse } from 'vite-plugin-env-parse'
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), 'env')
  return {
    envDir: './env', // 自定义env目录
    plugins: [react(), eslintPlugin(), envParse()],
    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer()], //postcssPresetEnv()
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)), // 为 @ 设置别名
      },
    },
    server: {
      // 指定dev sever的端口号，默认为5173
      port: env.VITE_APP_PORT,
      // 自动打开浏览器运行以下页面
      // open: '/',
      // 设置反向代理
      proxy: {
        // 以下示例表示：请求URL中含有"/api"，则反向代理到http://localhost
        // 例如: http://localhost:3000/api/login -> http://localhost/api/login
        // 如果反向代理到localhost报错Error: connect ECONNREFUSED ::1:80，
        // 则将localhost改127.0.0.1
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    esbuild: {
      // 移除console和debugger
      // drop: ['console', 'debugger'],
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          //生产环境时移除console
          drop_console: true,
          drop_debugger: true,
        },
      },
      // 打包目录结构控制
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name.endsWith('.css')) {
              return 'static/css/[name]-[hash].[ext]'
            } else if (
              ['.jpg', '.png', '.gif', '.svg'].some((ext) => assetInfo.name.endsWith(ext))
            ) {
              return 'static/img/[name]-[hash].[ext]'
            }
            return 'static/assets/[name]-[hash].[ext]'
          },
        },
      },
    },
  }
})
