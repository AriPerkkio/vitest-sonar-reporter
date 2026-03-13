import { defineConfig } from "vitest/config";

export default defineConfig({
  server: { watch: { ignored: ["report-from-tests.xml"] } },

  test: {
    include: ["test/*.test.ts"],
    reporters: "verbose",

    coverage: {
      enabled: true,
      include: ["src/**"],
    },

    onConsoleLog(log) {
      if (log.includes("SonarQube report written to")) {
        return false;
      }
    },
  },
});
