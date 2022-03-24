import { defineConfig } from 'vitest/config';

import SonarReporter from '../src/sonar-reporter';

export const outputFile = 'report-from-tests.xml';

export default defineConfig({
    test: {
        watch: false,
        reporters: new SonarReporter(),
        outputFile,
        include: [
            'test/fixtures/animals.test.ts',
            'test/fixtures/math.test.ts',
        ],
    },
});
