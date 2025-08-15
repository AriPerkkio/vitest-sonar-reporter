import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/math.test.ts"],
    reporters: ["verbose", "vitest-sonar-reporter"],
    outputFile: "./sonar-report.xml",
  },
});
