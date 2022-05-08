import { expect, test, Vitest } from 'vitest';

import SonarReporter from '../src/sonar-reporter';

test('resolves outputFile from string', () => {
    const reporter = new SonarReporter();

    reporter.onInit(getConfig({ outputFile: 'test-report.xml' }));

    expect(reporter.outputFile).toMatchInlineSnapshot('"test-report.xml"');
});

test('resolves outputFile from object', () => {
    const reporter = new SonarReporter();

    reporter.onInit(
        getConfig({
            outputFile: {
                'vitest-sonar-reporter': 'test-report-from-object.xml',
            },
        })
    );

    expect(reporter.outputFile).toMatchInlineSnapshot(
        '"test-report-from-object.xml"'
    );
});

test('throws when outputFile is missing', () => {
    const reporter = new SonarReporter();

    expect(() =>
        reporter.onInit(getConfig({ outputFile: undefined }))
    ).toThrowErrorMatchingInlineSnapshot(
        '"SonarReporter requires config.outputFile to be defined in vite config"'
    );
});

test('throws when outputFile object is missing entry', () => {
    const reporter = new SonarReporter();

    expect(() =>
        reporter.onInit(getConfig({ outputFile: { json: 'json-report.json' } }))
    ).toThrowErrorMatchingInlineSnapshot(`
      "Unable to resolve outputFile for vitest-sonar-reporter.
      Define outputFile as string or add entry for it:
      {
        \\"test\\": {
          \\"outputFile\\": {
            \\"vitest-sonar-reporter\\": \\"sonar-report.xml\\"
          }
        }
      }"
    `);
});

function getConfig(config: Partial<Vitest['config']>): Vitest {
    return { config } as Vitest; // Trick tsc since all we need is config
}
