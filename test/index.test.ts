import { existsSync, readFileSync, rmSync } from 'node:fs';
import { beforeEach, expect, test, vi } from 'vitest';
import { startVitest } from 'vitest/node';
import { stabilizeReport } from './utils';

const outputFile = 'report-from-tests.xml';
const reporterPath = new URL('../src/index.ts', import.meta.url).href;

beforeEach(() => {
    if (existsSync(outputFile)) {
        rmSync(outputFile);
    }
});

test('writes a report', async () => {
    expect(existsSync(outputFile)).toBe(false);

    await runVitest();
    expect(existsSync(outputFile)).toBe(true);

    const contents = readFileSync(outputFile, 'utf-8');
    const stable = stabilizeReport(contents);

    expect(stable).toMatchInlineSnapshot(`
      "<testExecutions version="1">
        <file path="test/fixtures/animals.test.ts">
          <testCase name="animals - dogs say woof" duration="123" />
          <testCase name="animals - figure out what rabbits say" duration="123">
            <skipped message="figure out what rabbits say" />
          </testCase>
          <testCase name="animals - flying ones - cat can fly" duration="123">
            <failure message="expected false to be true // Object.is equality">
              <![CDATA[AssertionError: expected false to be true // Object.is equality
          at <process-cwd>/test/fixtures/animals.test.js
          <removed-stacktrace>
            </failure>
          </testCase>
          <testCase name="animals - flying ones - bird can fly" duration="123" />
        </file>
        <file path="test/fixtures/math.test.ts">
          <testCase name="math - sum" duration="123" />
          <testCase name="math - multiply" duration="123" />
          <testCase name="math - slow calculation" duration="123" />
          <testCase name="math - tricky calculation of &quot;16 / 4&quot;" duration="123">
            <failure message="expected 4 to deeply equal 8">
              <![CDATA[AssertionError: expected 4 to deeply equal 8
          at <process-cwd>/test/fixtures/math.test.js
          <removed-stacktrace>
            </failure>
          </testCase>
          <testCase name="math - complex calculation" duration="123">
            <error message="16.divideByTwo is not a function">
              <![CDATA[TypeError: 16.divideByTwo is not a function
          at <process-cwd>/test/fixtures/math.test.js
          <removed-stacktrace>
            </error>
          </testCase>
          <testCase name="math - random numbers are unstable" duration="123">
            <skipped message="random numbers are unstable" />
          </testCase>
          <testCase name="math - learn square roots" duration="123">
            <skipped message="learn square roots" />
          </testCase>
          <testCase name="math - divide - basic" duration="123" />
          <testCase name="math - divide - by zero" duration="123" />
        </file>
      </testExecutions>"
    `);
});

test('file path can be rewritten using options.onWritePath ', async () => {
    await runVitest({
        reporterOptions: {
            onWritePath(path: string) {
                return `custom-prefix/${path}`;
            },
        },
    });

    const contents = readFileSync(outputFile, 'utf-8');
    const stable = stabilizeReport(contents);

    expect(stable).toMatchInlineSnapshot(`
      "<testExecutions version="1">
        <file path="custom-prefix/test/fixtures/animals.test.ts">
          <testCase name="animals - dogs say woof" duration="123" />
          <testCase name="animals - figure out what rabbits say" duration="123">
            <skipped message="figure out what rabbits say" />
          </testCase>
          <testCase name="animals - flying ones - cat can fly" duration="123">
            <failure message="expected false to be true // Object.is equality">
              <![CDATA[AssertionError: expected false to be true // Object.is equality
          at <process-cwd>/test/fixtures/animals.test.js
          <removed-stacktrace>
            </failure>
          </testCase>
          <testCase name="animals - flying ones - bird can fly" duration="123" />
        </file>
        <file path="custom-prefix/test/fixtures/math.test.ts">
          <testCase name="math - sum" duration="123" />
          <testCase name="math - multiply" duration="123" />
          <testCase name="math - slow calculation" duration="123" />
          <testCase name="math - tricky calculation of &quot;16 / 4&quot;" duration="123">
            <failure message="expected 4 to deeply equal 8">
              <![CDATA[AssertionError: expected 4 to deeply equal 8
          at <process-cwd>/test/fixtures/math.test.js
          <removed-stacktrace>
            </failure>
          </testCase>
          <testCase name="math - complex calculation" duration="123">
            <error message="16.divideByTwo is not a function">
              <![CDATA[TypeError: 16.divideByTwo is not a function
          at <process-cwd>/test/fixtures/math.test.js
          <removed-stacktrace>
            </error>
          </testCase>
          <testCase name="math - random numbers are unstable" duration="123">
            <skipped message="random numbers are unstable" />
          </testCase>
          <testCase name="math - learn square roots" duration="123">
            <skipped message="learn square roots" />
          </testCase>
          <testCase name="math - divide - basic" duration="123" />
          <testCase name="math - divide - by zero" duration="123" />
        </file>
      </testExecutions>"
    `);
});

test('report location is logged', async () => {
    const spy = vi.spyOn(console, 'log');
    await runVitest();

    expect(existsSync(outputFile)).toBe(true);

    const call = spy.mock.lastCall?.[0];
    spy.mockRestore();

    expect(stabilizeReport(call)).toMatchInlineSnapshot(
        '"SonarQube report written to <process-cwd>/report-from-tests.xml"',
    );
});

test('logging can be silenced, legacy config', async () => {
    const spy = vi.spyOn(console, 'log');
    await runVitest({ config: { sonarReporterOptions: { silent: true } } });

    expect(existsSync(outputFile)).toBe(true);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
});

test('logging can be silenced via options', async () => {
    const spy = vi.spyOn(console, 'log');
    await runVitest({ reporterOptions: { silent: true } });

    expect(existsSync(outputFile)).toBe(true);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
});

async function runVitest(options?: {
    reporterOptions?: Record<string, unknown>;
    config?: Record<string, unknown>;
}) {
    await startVitest('test', [], {
        watch: false,
        reporters: [[reporterPath, options?.reporterOptions || {}]],
        outputFile,
        include: ['test/fixtures/*.test.ts'],
        ...options?.config,
    });
}
