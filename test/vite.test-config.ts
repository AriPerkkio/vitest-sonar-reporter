import { defineConfig } from 'vitest/config';
import { BaseSequencer } from 'vitest/node';

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

        // Run tests in fixed order to keep generated XML report stable between runs
        sequence: {
            // @ts-expect-error -- vitest-dev/vitest#1619
            sequencer: class Seqencer extends BaseSequencer {
                async sort(files: string[]) {
                    const sorted = files.sort();

                    return sorted;
                }

                async shard(files: string[]) {
                    return files;
                }
            },
        },
    },
});
