import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/admin/",
  plugins: [react()],
  // server: {
  //   port: 80, // 👈 change port to 80
  //   host: true, // allow external access (optional)
  // },
});
