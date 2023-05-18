import { describe, test, expect } from 'vitest';

import { renderUser } from '../src/render-user';

describe('renderUser', () => {
    test('renders user', () => {
        expect(renderUser('John Doe')).toMatchInlineSnapshot(`
          "
                <div class=\\"user\\">
                  <span class=\\"firstname\\">John</span>
                  <span class=\\"lastname\\">Doe</span>
                </div>
              "
        `);
    });
});
