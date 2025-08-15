import { expect, test, Vitest } from "vitest";

import SonarReporter from "../src/sonar-reporter";

test("resolves outputFile from string", () => {
  const reporter = new SonarReporter();

  reporter.onInit(getConfig({ outputFile: "test-report.xml" }));

  expect(reporter.options.outputFile).toMatchInlineSnapshot(
    '"test-report.xml"',
  );
});

test("resolves outputFile from object", () => {
  const reporter = new SonarReporter();

  reporter.onInit(
    getConfig({
      outputFile: {
        "vitest-sonar-reporter": "test-report-from-object.xml",
      },
    }),
  );

  expect(reporter.options.outputFile).toMatchInlineSnapshot(
    '"test-report-from-object.xml"',
  );
});

test("throws when outputFile is missing", () => {
  const reporter = new SonarReporter();

  expect(() =>
    reporter.onInit(getConfig({ outputFile: undefined })),
  ).toThrowErrorMatchingInlineSnapshot(
    `[Error: SonarReporter requires outputFile to be defined in config]`,
  );
});

test("throws when outputFile object is missing entry", () => {
  const reporter = new SonarReporter();

  expect(() =>
    reporter.onInit(getConfig({ outputFile: { json: "json-report.json" } })),
  ).toThrowErrorMatchingInlineSnapshot(`
      [Error: Unable to resolve outputFile for vitest-sonar-reporter.
      Define outputFile in reporter options:
      {
        "test": {
          "reporters": [
            [
              "vitest-sonar-reporter",
              {
                "outputFile": "sonar-report.xml"
              }
            ]
          ]
        }
      }]
    `);
});

function getConfig(config: Partial<Vitest["config"]>): Vitest {
  return { config } as Vitest; // Trick tsc since all we need is config
}
