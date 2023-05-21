/*
 * This configuration is unrelated to workspace example setup.
 */

import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['report.test.ts'],
        reporters: ['verbose'],
    },
});
