import { describe, expect, test } from 'vitest';

describe('math', () => {
    test('sum', () => {
        expect(1 + 1).toEqual(2);
    });

    test('multiply', () => {
        expect(2 * 2).toEqual(4);
    });
});
