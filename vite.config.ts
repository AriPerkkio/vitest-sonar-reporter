import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        exclude: [
            'test/fixtures',
            // Defaults
            'node_modules',
            'dist',
            '.idea',
            '.git',
            '.cache',
        ],
    },
});
