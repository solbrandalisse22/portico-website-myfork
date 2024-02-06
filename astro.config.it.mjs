import shared from './astro.config.shared.mjs'
import { defineConfig } from 'astro/config'

export default defineConfig({
    ...shared,
    site: 'https://porticosport.it',
    srcDir: './src/it',
})