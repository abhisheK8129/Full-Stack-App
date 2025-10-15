import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import {dirname} from 'path'
import {fileURLToPath} from 'url'
import tailwindcss from '@tailwindcss/vite'
const __filename = fileURLToPath(import.meta.url)
const __dirname  = dirname(__filename)


// https://vite.dev/config/
export default defineConfig({
  server:{
    port: 4900
  },
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
