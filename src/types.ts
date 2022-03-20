import type { defineConfig } from 'vitest/config';

/*
 * Work-arounds for https://github.com/vitest-dev/vitest/issues/991
 */
type UserConfig = Parameters<typeof defineConfig>[0];
type Reporters = NonNullable<UserConfig['test']>['reporters'];
export type Reporter = NonNullable<
    Exclude<
        Reporters,
        | 'default'
        | 'verbose'
        | 'dot'
        | 'json'
        | 'tap'
        | 'tap-flat'
        | 'junit'
        | any[]
    >
>;
type OnInit = NonNullable<Reporter['onInit']>;
export type Vitest = Parameters<OnInit>[0];
