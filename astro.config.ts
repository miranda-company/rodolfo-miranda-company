import mdx from "@astrojs/mdx"
import { defineConfig } from "astro/config"

const port = Number.parseInt(process.env.PORT ?? "8443", 10)

export default defineConfig({
  output: "static",
  integrations: [mdx()],
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "github-light",
      wrap: false,
    },
  },
  redirects: {
    "/biblioteca": {
      status: 301,
      destination: "/mediateca",
    },
    "/biblioteca/[slug]": {
      status: 301,
      destination: "/mediateca/[slug]",
    },
  },
  devToolbar: {
    enabled: false,
  },
  server: {
    host: true,
    port,
  },
})
