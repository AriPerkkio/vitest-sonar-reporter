import { defineConfig } from 'vitest/config';

import SonarReporter from '../src';

export const outputFile = 'report-from-tests.xml';

export default defineConfig({
    test: {
        watch: false,
        reporters: new SonarReporter(),
        outputFile,
        exclude: [
            'test/*.test.ts',
            // Defaults
            'node_modules',
            'dist',
            '.idea',
            '.git',
            '.cache',
        ],
    },
});
