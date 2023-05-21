import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import type { Reporter, File, Vitest } from 'vitest';

import { generateXml } from './xml.js';

/**
 * Reporter used by `vitest`
 */
export default class SonarReporter implements Reporter {
    ctx!: Vitest;
    outputFile!: string;
    silent!: boolean;

    onInit(ctx: Vitest) {
        this.ctx = ctx;

        // @ts-expect-error -- untyped
        this.silent = ctx.config.sonarReporterOptions?.silent === true;

        if (!this.ctx.config.outputFile) {
            throw new Error(
                'SonarReporter requires config.outputFile to be defined in vite config'
            );
        }

        this.outputFile = resolveOutputfile(this.ctx.config);

        if (existsSync(this.outputFile)) {
            rmSync(this.outputFile);
        }
    }

    onFinished(rawFiles?: File[]) {
        const reportFile = resolve(this.ctx.config.root, this.outputFile);

        // Map filepaths to be relative to root for workspace support
        const files = rawFiles?.map((file) => ({
            ...file,
            name: relative(process.cwd(), file.filepath),
        }));

        const outputDirectory = dirname(reportFile);
        if (!existsSync(outputDirectory)) {
            mkdirSync(outputDirectory, { recursive: true });
        }

        const sorted = files?.sort(sortByFilename);

        writeFileSync(reportFile, generateXml(sorted), 'utf-8');

        if (!this.silent) {
            this.ctx.logger.log(`SonarQube report written to ${reportFile}`);
        }
    }
}

function resolveOutputfile(config: Vitest['config']) {
    if (typeof config.outputFile === 'string') {
        return config.outputFile;
    }

    if (config.outputFile['vitest-sonar-reporter']) {
        return config.outputFile['vitest-sonar-reporter'];
    }

    throw new Error(
        [
            'Unable to resolve outputFile for vitest-sonar-reporter.',
            'Define outputFile as string or add entry for it:',
            JSON.stringify(
                {
                    test: {
                        outputFile: {
                            'vitest-sonar-reporter': 'sonar-report.xml',
                        },
                    },
                },
                null,
                2
            ),
        ].join('\n')
    );
}

function sortByFilename(a: File, b: File): -1 | 0 | 1 {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;

    return 0;
}
