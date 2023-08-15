import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://sendevosoftware.com.ar/presipedia/app/",
  build: {
    outDir: 'dist-web',
  },
})
