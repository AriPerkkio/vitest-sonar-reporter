import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/report.test.ts"],
    reporters: ["verbose"],
  },
});
