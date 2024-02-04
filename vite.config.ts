import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        reporters: 'verbose',
        include: ['test/*.test.ts'],
        watchExclude: ['report-from-tests.xml'],
        onConsoleLog(log) {
            if (log.includes('SonarQube report written to')) {
                return false;
            }
        },
    },
});
