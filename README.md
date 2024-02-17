# vitest-sonar-reporter

[![Version][version-badge]][npm-url]
[![Downloads][downloads-url]][npm-url]
[![Compatibility with vitest@latest][vitest-check-badge]][vitest-check-url]

[Live examples](#live-examples) | [Installation](#installation) | [Configuration](#configuration) | [Code coverage](#code-coverage) | [Examples](#examples)

---

> [SonarQube](https://docs.sonarqube.org/) reporter for [Vitest](https://vitest.dev/)

Generates [Generic Execution](https://docs.sonarqube.org/latest/analysis/generic-test/#header-2) reports from `vitest` tests for SonarQube to analyze.

## Live examples

-   Project with [Vitest Workspaces](https://vitest.dev/guide/workspace.html) | [Stackblitz](https://stackblitz.com/edit/vitest-sonar-reporter-workspaces)
-   Project with `{ type: "module" }` | [Stackblitz](https://stackblitz.com/edit/vitest-sonar-reporter-esm)
-   Project with `{ type: "commonjs" }` | [Stackblitz](https://stackblitz.com/edit/vitest-sonar-reporter-cjs)

## Installation

`vitest-sonar-reporter` should be included in development dependencies. `vitest` is required as peer dependency.

```sh
npm install --save-dev vitest-sonar-reporter
```

## Configuration

Add new custom reporter and define `outputFile` in your [`vite.config.ts`](https://vitest.dev/config/):

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        reporters: [
            ['vitest-sonar-reporter', { outputFile: 'sonar-report.xml' }],
        ],
    },
});
```

If you are using Vitest below version `^1.3.0` you can define file in `test.outputFile`:

```ts
test: {
    reporters: ['json', 'verbose', 'vitest-sonar-reporter'],
    outputFile: {
        json: 'my-json-report.json',
        'vitest-sonar-reporter': 'sonar-report.xml',
    },
},
```

Instruct SonarQube to pick report in your [`sonar-project.properties`](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/):

```
sonar.testExecutionReportPaths=sonar-report.xml
```

-   ❌ Do not `import` reporter as `import SonarReporter from 'vitest-sonar-reporter';`
-   ✅ Define reporter as `reporters: ['vitest-sonar-reporter']` so that `vitest` will process it. This quarantees support for projects without `{ type: 'module' }`.

### Options

You can pass additional options to reporter. Note that this requires `vitest@^1.3.0`.

#### `silent`

Silence reporter's verbose logging.

```ts
test: {
    reporters: [
        ['vitest-sonar-reporter', { silent: true }]
    ],
}
```

#### `onWritePath`

Rewrite `path` attribute of `<file>`. This can be useful when you need to change relative paths of the files.

```ts
test: {
    reporters: [
        ['vitest-sonar-reporter', {
            onWritePath(path: string) {
                // Prefix all paths with root directory
                // e.g. '<file path="test/math.ts">' to '<file path="frontend/test/math.ts">'
                return `frontend/${path}`;
            }
        }]
    ],
}
```

```diff
<testExecutions version="1">
-  <file path="test/math.ts">
+  <file path="frontend/test/math.ts">
    <testCase name="multiply" duration="123" />
  </file>
</testExecutions>
```

#### `outputFile`

Location for the report.

```ts
test: {
    reporters: [
        ['vitest-sonar-reporter', { outputFile: 'sonar-report.xml' }]
    ],
}
```

## Code Coverage

This reporter does not process code coverage - Vitest already supports that out-of-the-box!

Simply configure `vitest` to output LCOV reports and instruct SonarQube to pick these reports.

```ts
test: {
    coverage: {
        reporters: 'lcov',
    },
},
```

```
sonar.javascript.lcov.reportPaths=./coverage/lcov.info
```

## Examples

### Workspace

See [examples/example-workspace](https://github.com/AriPerkkio/vitest-sonar-reporter/tree/main/examples/example-workspace) for example setup using [Vitest Workspaces](https://vitest.dev/guide/workspace.html).

### Basic

```ts
import { describe, expect, test } from 'vitest';

describe('animals', () => {
    test('dogs say woof', () => {
        const dog = { say: () => 'woof' };
        expect(dog.say()).toBe('woof');
    });

    test.todo('figure out what rabbits say', () => {
        const rabbit = { say: () => '????' };
        expect(rabbit.say()).toBe('?');
    });

    describe('flying ones', () => {
        test('cats can fly', () => {
            const cat = { fly: () => false };
            expect(cat.fly()).toBe(true);
        });

        test('birds can fly', () => {
            const bird = { fly: () => true };
            expect(bird.fly()).toBe(true);
        });
    });
});
```

```xml
<testExecutions version="1">
  <file path="test/animals.test.ts">
    <testCase name="animals - dogs say woof" duration="2" />
    <testCase name="animals - figure out what rabbits say" duration="0">
      <skipped message="figure out what rabbits say" />
    </testCase>
    <testCase name="animals - flying ones - cats can fly" duration="4">
      <failure message="expected false to be true // Object.is equality">
        <![CDATA[AssertionError: expected false to be true // Object.is equality
    at /workspaces/example/test/animals.test.ts:15:47
    at /workspaces/example/node_modules/vitest/dist/chunk-runtime-chain.7032872a.js:82:26
    at runTest (/workspaces/example/node_modules/vitest/dist/entry.js:771:40)
    at async runSuite (/workspaces/example/node_modules/vitest/dist/entry.js:836:13)
    at async runSuite (/workspaces/example/node_modules/vitest/dist/entry.js:836:13)
    at async runSuite (/workspaces/example/node_modules/vitest/dist/entry.js:836:13)
    at async runFiles (/workspaces/example/node_modules/vitest/dist/entry.js:873:5)
    at async startTests (/workspaces/example/node_modules/vitest/dist/entry.js:879:3)
    at async /workspaces/example/node_modules/vitest/dist/entry.js:906:7
    at async withEnv (/workspaces/example/node_modules/vitest/dist/entry.js:503:5)]]>
      </failure>
    </testCase>
    <testCase name="animals - flying ones - birds can fly" duration="5" />
  </file>
</testExecutions>
```

[version-badge]: https://img.shields.io/npm/v/vitest-sonar-reporter
[npm-url]: https://www.npmjs.com/package/vitest-sonar-reporter
[downloads-url]: https://img.shields.io/npm/dm/vitest-sonar-reporter
[vitest-check-badge]: https://github.com/ariperkkio/vitest-sonar-reporter/workflows/vitest@latest%20compatibility/badge.svg
[vitest-check-url]: https://github.com/AriPerkkio/vitest-sonar-reporter/actions/workflows/vitest-latest-compatibility.yml
