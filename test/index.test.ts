import { execSync } from 'child_process';
import { existsSync, readFileSync, rmSync } from 'fs';
import { afterEach, beforeEach, expect, test } from 'vitest';

import { outputFile } from './vite.test-config';

afterEach(cleanup);
beforeEach(cleanup);

test('writes a report', () => {
    expect(existsSync(outputFile)).toBe(false);

    execSync('yarn test --config test/vite.test-config.ts', {
        stdio: 'inherit',
    });

    expect(existsSync(outputFile)).toBe(true);
    expect(readFileSync(outputFile, 'utf-8')).toMatchInlineSnapshot(`
      "<testExecutions version=\\"1\\">
          <file path=\\"test/fixtures/math.test.ts\\">
          </file>
      </testExecutions>"
    `);
});

function cleanup() {
    if (existsSync(outputFile)) {
        rmSync(outputFile);
    }
}
