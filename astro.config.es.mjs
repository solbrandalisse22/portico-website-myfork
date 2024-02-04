import shared from './astro.config.shared.mjs'
import { defineConfig } from 'astro/config'

export default defineConfig({
    ...shared,
    srcDir: './src/es',
})