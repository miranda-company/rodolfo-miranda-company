import { defineConfig } from "astro/config";

const port = Number.parseInt(process.env.PORT ?? "8443", 10);

export default defineConfig({
  output: "static",
  devToolbar: {
    enabled: false,
  },
  server: {
    host: true,
    port,
  },
});
