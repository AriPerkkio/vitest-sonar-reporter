import { describe, expect, test } from 'vitest';

describe('animals', () => {
    test('dogs say woof', () => {
        const dog = { say: () => 'woof' };

        expect(dog.say()).toBe('woof');
    });

    test.todo('figure out what rabbits say', () => {
        const rabbit = { say: () => '????' };

        expect(rabbit.say()).toBe('?');
    });

    describe('flying ones', () => {
        test('cat can fly', () => {
            const cat = { fly: () => false };

            expect(cat.fly()).toBe(true);
        });

        test('bird can fly', () => {
            const bird = { fly: () => true };

            expect(bird.fly()).toBe(true);
        });
    });
});
