import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";


export default defineConfig({
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },

  // update me!
  site: "https://sewer-drain.netlify.app/",

  integrations: [
    icon(),
    sitemap({
      filter: (page) => !page.includes("/admin"),
      changefreq: "weekly",
      priority: 0.7,
    }),
  ],
});