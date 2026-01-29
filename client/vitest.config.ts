import path from "node:path";
import babel from "@rollup/plugin-babel";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      "react-native": path.resolve(__dirname, "vitest.react-native-mock.ts"),
    },
  },
  esbuild: {
    jsx: "automatic",
  },
  plugins: [
    babel({
      babelHelpers: "runtime",
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      presets: [
        "@babel/preset-flow",
        ["@babel/preset-react", { runtime: "automatic" }],
      ],
      include: [
        /node_modules\/react-native/,
        /node_modules\/@react-native/,
        /node_modules\/react-native-gesture-handler/,
        /node_modules\/react-native-reanimated/,
        /node_modules\/react-native-worklets/,
        /node_modules\/expo/,
        /node_modules\/expo-router/,
        /node_modules\/@expo/,
      ],
    }),
  ],
  test: {
    environment: "jsdom",
    include: [
      "src/**/*.test.ts",
      "src/**/*.test.tsx",
      "app/**/*.test.ts",
      "app/**/*.test.tsx",
    ],
    setupFiles: ["./vitest.setup.ts"],
    deps: {
      inline: [
        /@testing-library\/react-native/,
        /react-native/,
        /@react-native/,
        /react-native-gesture-handler/,
        /react-native-reanimated/,
        /expo/,
        /expo-router/,
        /@expo/,
      ],
    },
  },
});
