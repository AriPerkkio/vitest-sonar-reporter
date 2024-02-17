import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import type { Reporter, File, Vitest } from 'vitest';

import { generateXml } from './xml.js';

export interface SonarReporterOptions {
    outputFile: string;
    silent?: boolean;
    onWritePath: (path: string) => string;
}

/**
 * Reporter used by `vitest`
 */
export default class SonarReporter implements Reporter {
    ctx!: Vitest;
    options: SonarReporterOptions;

    constructor(options?: Partial<SonarReporterOptions>) {
        this.options = {
            silent: options?.silent ?? false,
            onWritePath: options?.onWritePath ?? defaultOnWritePath,

            // @ts-expect-error -- Can also be initialized during onInit()
            outputFile: options?.outputFile,
        };
    }

    onInit(ctx: Vitest) {
        this.ctx = ctx;

        this.options.silent =
            this.options.silent ||
            // TODO: Remove in v2.0.0
            // @ts-expect-error -- untyped
            ctx.config.sonarReporterOptions?.silent === true;

        if (!this.ctx.config.outputFile && !this.options.outputFile) {
            throw new Error(
                'SonarReporter requires outputFile to be defined in config',
            );
        }

        this.options.outputFile =
            this.options.outputFile ?? resolveOutputfile(this.ctx.config);

        if (existsSync(this.options.outputFile)) {
            rmSync(this.options.outputFile);
        }
    }

    onFinished(rawFiles?: File[]) {
        const reportFile = resolve(
            this.ctx.config.root,
            this.options.outputFile,
        );

        // Map filepaths to be relative to root for workspace support
        const files = rawFiles?.map((file) => ({
            ...file,
            name: this.options.onWritePath(
                relative(process.cwd(), file.filepath),
            ),
        }));

        const outputDirectory = dirname(reportFile);
        if (!existsSync(outputDirectory)) {
            mkdirSync(outputDirectory, { recursive: true });
        }

        const sorted = files?.sort(sortByFilename);

        writeFileSync(reportFile, generateXml(sorted), 'utf-8');

        if (!this.options.silent) {
            this.ctx.logger.log(`SonarQube report written to ${reportFile}`);
        }
    }
}

function defaultOnWritePath(path: string) {
    return path;
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
            'Define outputFile in reporter options:',
            JSON.stringify(
                {
                    test: {
                        reporters: [
                            [
                                'vitest-sonar-reporter',
                                { outputFile: 'sonar-report.xml' },
                            ],
                        ],
                    },
                },
                null,
                2,
            ),
        ].join('\n'),
    );
}

function sortByFilename(a: File, b: File): -1 | 0 | 1 {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;

    return 0;
}
