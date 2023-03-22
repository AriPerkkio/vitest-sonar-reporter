import { exec } from 'child_process';
import { existsSync, readFileSync, rmSync } from 'fs';
import { beforeEach, expect, test } from 'vitest';
import { stabilizeReport } from './utils';

import { outputFile } from './vite.test-config';

beforeEach(cleanup);

test('writes a report', async () => {
    expect(existsSync(outputFile)).toBe(false);

    await runVitest();
    expect(existsSync(outputFile)).toBe(true);

    const contents = readFileSync(outputFile, 'utf-8');
    const stable = stabilizeReport(contents);

    expect(stable).toMatchInlineSnapshot(`
      "<testExecutions version=\\"1\\">
        <file path=\\"test/fixtures/animals.test.ts\\">
          <testCase name=\\"animals - dogs say woof\\" duration=\\"123\\" />
          <testCase name=\\"animals - figure out what rabbits say\\" duration=\\"123\\">
            <skipped message=\\"figure out what rabbits say\\" />
          </testCase>
          <testCase name=\\"animals - flying ones - cat can fly\\" duration=\\"123\\">
            <failure message=\\"expected false to be true // Object.is equality\\">
              <![CDATA[AssertionError: expected false to be true // Object.is equality
          at <process-cwd>/test/fixtures/animals.test.js
          <removed-stacktrace>
            </failure>
          </testCase>
          <testCase name=\\"animals - flying ones - bird can fly\\" duration=\\"123\\" />
        </file>
        <file path=\\"test/fixtures/math.test.ts\\">
          <testCase name=\\"math - sum\\" duration=\\"123\\" />
          <testCase name=\\"math - multiply\\" duration=\\"123\\" />
          <testCase name=\\"math - slow calculation\\" duration=\\"123\\" />
          <testCase name=\\"math - tricky calculation of &quot;16 / 4&quot;\\" duration=\\"123\\">
            <failure message=\\"expected 4 to deeply equal 8\\">
              <![CDATA[AssertionError: expected 4 to deeply equal 8
          at <process-cwd>/test/fixtures/math.test.js
          <removed-stacktrace>
            </failure>
          </testCase>
          <testCase name=\\"math - complex calculation\\" duration=\\"123\\">
            <error message=\\"16.divideByTwo is not a function\\">
              <![CDATA[TypeError: 16.divideByTwo is not a function
          at <process-cwd>/test/fixtures/math.test.js
          <removed-stacktrace>
            </error>
          </testCase>
          <testCase name=\\"math - random numbers are unstable\\" duration=\\"123\\">
            <skipped message=\\"random numbers are unstable\\" />
          </testCase>
          <testCase name=\\"math - learn square roots\\" duration=\\"123\\">
            <skipped message=\\"learn square roots\\" />
          </testCase>
          <testCase name=\\"math - divide - basic\\" duration=\\"123\\" />
          <testCase name=\\"math - divide - by zero\\" duration=\\"123\\" />
        </file>
      </testExecutions>"
    `);
});

test('report location is logged', async () => {
    const data = await runVitest();
    expect(existsSync(outputFile)).toBe(true);

    expect(stabilizeReport(data)).toMatchInlineSnapshot(
        '"SonarQube report written to <process-cwd>/report-from-tests.xml"'
    );
});

test('logging can be silenced', async () => {
    const data = await runVitest({
        env: { ...process.env, TEST_ARGS_SILENT: 1 },
    });

    expect(existsSync(outputFile)).toBe(true);
    expect(data).toBe('');
});

async function runVitest(opts = {}) {
    // "vitest" binary should be available when run through package.json script
    const subprocess = exec('vitest --config test/vite.test-config.ts', opts);

    let stdout = '';
    subprocess.stdout?.on('data', (data) => (stdout += data.toString()));

    await new Promise((resolve, reject) => {
        subprocess.on('exit', resolve);
        subprocess.stderr?.on('data', reject);
    });

    return stdout;
}

function cleanup() {
    if (existsSync(outputFile)) {
        rmSync(outputFile);
    }
}
