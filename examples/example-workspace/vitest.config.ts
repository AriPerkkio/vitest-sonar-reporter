import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    reporters: [
      "verbose",
      ["vitest-sonar-reporter", { outputFile: "./sonar-report.xml" }],
    ],

    projects: ["packages/*"],
  },
});
