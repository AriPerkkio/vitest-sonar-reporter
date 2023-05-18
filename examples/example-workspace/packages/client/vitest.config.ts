import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        name: 'client',
        alias: {
            '@shared': fileURLToPath(
                new URL('../shared/src/index.ts', import.meta.url)
            ),
        },
    },
});
