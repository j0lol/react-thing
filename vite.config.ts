import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		transformer: "lightningcss",
	},
	server: {
		cors: false,
		proxy: {
			"/api": {
				target: "https://j0.lol",
				changeOrigin: true,
				secure: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
});
