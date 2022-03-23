import { describe, expect, test } from 'vitest';

describe('math', () => {
    test('sum', () => {
        expect(1 + 1).toEqual(2);
    });

    test('multiply', () => {
        expect(2 * 2).toEqual(4);
    });

    test('slow calculation', async () => {
        await new Promise((r) => setTimeout(r, 125));

        expect(1).toBe(1);
    });

    test('tricky calculation', () => {
        expect(16 / 4).toEqual(8);
    });

    test('complex calculation', () => {
        // @ts-expect-error -- intentionally caused error
        expect((16).divideByTwo()).toEqual(8);
    });

    test.todo('random numbers are unstable', () => {
        expect(Math.random()).toBe(0.319933410900185);
    });

    test.todo('learn square roots', () => {
        expect(Math.sqrt(16)).toBe(undefined);
    });

    describe('empty suite', () => {
        //
    });

    describe('divide', () => {
        test('basic', () => {
            expect(4 / 2).toBe(2);
        });

        test('by zero', async () => {
            expect(1 / 0).toBe(Infinity);
        });
    });
});
