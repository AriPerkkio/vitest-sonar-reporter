import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        reporters: 'verbose',
        include: ['test/*.test.ts'],
    },
});
