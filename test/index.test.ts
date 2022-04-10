import { execSync } from 'child_process';
import { existsSync, readFileSync, rmSync } from 'fs';
import { beforeEach, expect, test } from 'vitest';

import { outputFile } from './vite.test-config';

beforeEach(cleanup);

test('writes a report', () => {
    expect(existsSync(outputFile)).toBe(false);

    try {
        execSync('yarn test --config test/vite.test-config.ts', {
            stdio: 'inherit',
        });
    } catch (_) {
        // Ignore exit codes
    }

    expect(existsSync(outputFile)).toBe(true);

    const contents = readFileSync(outputFile, 'utf-8');
    const stable = removeCwd(removeLineNumbers(removeDurations(contents)));

    expect(stable).toMatchInlineSnapshot(`
      "<testExecutions version=\\"1\\">
        <file path=\\"test/fixtures/animals.test.ts\\">
          <testCase name=\\"animals - dogs say woof\\" duration=\\"123\\" />
          <testCase name=\\"animals - figure out what rabbits say\\">
            <skipped message=\\"figure out what rabbits say\\" />
          </testCase>
          <testCase name=\\"animals - flying ones - cat can fly\\" duration=\\"123\\">
            <failure message=\\"expected false to be true // Object.is equality\\">
              <![CDATA[AssertionError: expected false to be true // Object.is equality
          at <process-cwd>/test/fixtures/animals.test.ts:15:47
          at <process-cwd>/node_modules/vitest/dist/chunk-runtime-chain.e17b859e.js
          at runTest (<process-cwd>/node_modules/vitest/dist/entry.js)
          at async runSuite (<process-cwd>/node_modules/vitest/dist/entry.js)
          at async runSuite (<process-cwd>/node_modules/vitest/dist/entry.js)
          at async runSuite (<process-cwd>/node_modules/vitest/dist/entry.js)
          at async runFiles (<process-cwd>/node_modules/vitest/dist/entry.js)
          at async startTests (<process-cwd>/node_modules/vitest/dist/entry.js)
          at async <process-cwd>/node_modules/vitest/dist/entry.js
          at async withEnv (<process-cwd>/node_modules/vitest/dist/entry.js)]]>
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
          at <process-cwd>/test/fixtures/math.test.ts:15:42
          at <process-cwd>/node_modules/vitest/dist/chunk-runtime-chain.e17b859e.js
          at runTest (<process-cwd>/node_modules/vitest/dist/entry.js)
          at async runSuite (<process-cwd>/node_modules/vitest/dist/entry.js)
          at async runSuite (<process-cwd>/node_modules/vitest/dist/entry.js)
          at async runFiles (<process-cwd>/node_modules/vitest/dist/entry.js)
          at async startTests (<process-cwd>/node_modules/vitest/dist/entry.js)
          at async <process-cwd>/node_modules/vitest/dist/entry.js
          at async withEnv (<process-cwd>/node_modules/vitest/dist/entry.js)
          at async run (<process-cwd>/node_modules/vitest/dist/entry.js)]]>
            </failure>
          </testCase>
          <testCase name=\\"math - complex calculation\\" duration=\\"123\\">
            <error message=\\"16.divideByTwo is not a function\\">
              <![CDATA[TypeError: 16.divideByTwo is not a function
          at <process-cwd>/test/fixtures/math.test.ts:18:38
          at <process-cwd>/node_modules/vitest/dist/chunk-runtime-chain.e17b859e.js
          at runTest (<process-cwd>/node_modules/vitest/dist/entry.js)
          at async runSuite (<process-cwd>/node_modules/vitest/dist/entry.js)
          at async runSuite (<process-cwd>/node_modules/vitest/dist/entry.js)
          at async runFiles (<process-cwd>/node_modules/vitest/dist/entry.js)
          at async startTests (<process-cwd>/node_modules/vitest/dist/entry.js)
          at async <process-cwd>/node_modules/vitest/dist/entry.js
          at async withEnv (<process-cwd>/node_modules/vitest/dist/entry.js)
          at async run (<process-cwd>/node_modules/vitest/dist/entry.js)]]>
            </error>
          </testCase>
          <testCase name=\\"math - random numbers are unstable\\">
            <skipped message=\\"random numbers are unstable\\" />
          </testCase>
          <testCase name=\\"math - learn square roots\\">
            <skipped message=\\"learn square roots\\" />
          </testCase>
          <testCase name=\\"math - divide - basic\\" duration=\\"123\\" />
          <testCase name=\\"math - divide - by zero\\" duration=\\"123\\" />
        </file>
      </testExecutions>"
    `);
});

function cleanup() {
    if (existsSync(outputFile)) {
        rmSync(outputFile);
    }
}

function removeDurations(report: string) {
    return report.replace(/duration="\d*"/g, 'duration="123"');
}

function removeCwd(report: string) {
    return report.replace(new RegExp(process.cwd(), 'g'), '<process-cwd>');
}

function removeLineNumbers(report: string) {
    return report.replace(/\.js:\d*:\d*/g, '.js');
}
