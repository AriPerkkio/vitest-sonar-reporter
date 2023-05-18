import { describe, expect, test } from 'vitest';

import { parseUserFromRequest } from '../src/request-parse';

describe('parseUserFromRequest', () => {
    test('returns user from request', () => {
        const request = { headers: { 'x-user': 'John Doe' } };

        expect(parseUserFromRequest(request)).toEqual({
            first: 'John',
            last: 'Doe',
        });
    });
});
