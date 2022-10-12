import { defineConfig } from 'windicss/helpers'
import lineClampPlugin from 'windicss/plugin/line-clamp';

export default defineConfig({
  preflight: {
    includeAll: false,
    includeBase: true,
    includeGlobal: false,
    includePlugin: true,
  },
  plugins: [
    lineClampPlugin
  ],
})