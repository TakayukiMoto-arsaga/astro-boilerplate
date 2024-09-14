import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://TakayukiMoto-arsaga.github.io',
  integrations: [react(), sitemap(), mdx()],
})
