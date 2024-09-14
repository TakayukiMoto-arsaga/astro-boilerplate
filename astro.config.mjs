import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://takayukiMoto-arsaga.github.io',
  base: '/astro-boilerplate',
  integrations: [react(), sitemap(), mdx()],
})
