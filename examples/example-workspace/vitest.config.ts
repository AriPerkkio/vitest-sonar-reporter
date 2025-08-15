import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    reporters: ["default", "vitest-sonar-reporter"],
    outputFile: {
      "vitest-sonar-reporter": "./sonar-report.xml",
    },
  },
});
