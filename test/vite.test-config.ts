import { defineConfig } from 'vitest/config';

import SonarReporter from '../src';

export const outputFile = 'report-from-tests.xml';

export default defineConfig({
    test: {
        watch: false,
        reporters: new SonarReporter(),
        outputFile,
        include: ['test/fixtures/*.test.ts'],
    },
});
