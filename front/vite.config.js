import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


export default ({ mode }) => {
  // Carga las variables de entorno desde el archivo .env
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_BACKEND_URL, // Usa process.env para acceder a las variables de entorno
          changeOrigin: true,
        }
      }
    }
  });
};
