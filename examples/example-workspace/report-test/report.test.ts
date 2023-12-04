/*
 * These tests are unrelated to workspace example setup.
 * They are here to test the report generation.
 */

import { existsSync, readFileSync } from 'node:fs';
import { expect, test } from 'vitest';

import { stabilizeReport } from '../../../test/utils';

test('report exists', () => {
    expect(existsSync('./sonar-report.xml')).toBe(true);
});

test('report matches snapshot', () => {
    const output = readFileSync('./sonar-report.xml', 'utf8');
    const report = stabilizeReport(output);

    expect(report).toMatchInlineSnapshot(`
      "<testExecutions version="1">
        <file path="packages/client/test/render-user.test.ts">
          <testCase name="renderUser - renders user" duration="123" />
        </file>
        <file path="packages/server/test/request-parse.test.ts">
          <testCase name="parseUserFromRequest - returns user from request" duration="123" />
        </file>
        <file path="packages/shared/test/user-utils.test.ts">
          <testCase name="parseName - returns first name" duration="123" />
          <testCase name="parseName - returns last name" duration="123" />
          <testCase name="getInitials - returns initials" duration="123" />
        </file>
      </testExecutions>"
    `);
});
