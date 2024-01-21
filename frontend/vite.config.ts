import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import path from 'path'

const createAlias = (alias, filePath) => {
  return {
    find: alias,
    replacement: path.resolve(__dirname, filePath)
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      createAlias('types', './src/lib/types.ts'),
      createAlias('general', './src/lib/general.ts'),
      createAlias('backend', './src/lib/backend-api.ts'),
      createAlias('lib', './src/lib'),
    ]
  }
})
