import type { defineConfig } from 'vitest/config';

/*
 * Work-arounds for https://github.com/vitest-dev/vitest/issues/991
 */
type UserConfig = Parameters<typeof defineConfig>[0];
type Reporters = NonNullable<UserConfig['test']>['reporters'];
export type Reporter = NonNullable<Exclude<Reporters, string | any[]>>;

type OnInit = NonNullable<Reporter['onInit']>;
export type Vitest = Parameters<OnInit>[0];

type OnFinished = NonNullable<Reporter['onFinished']>;
export type File = NonNullable<Parameters<OnFinished>[0]>[number];
