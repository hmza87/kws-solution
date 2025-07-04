import { describe, it, expect } from 'vitest';
import WordSearchSolver from './WordSearchSolver';
import type { CharCoordinate } from './Types';

describe('WordSearchSolver', () => {
    it('should correctly solve a simple word search puzzle', () => {
        const input = `BONES,KHAN
B,O,N,E,S
X,X,X,X,X
K,H,A,N,Y
Y,Y,Y,Y,Y
Z,Z,Z,Z,Z`;

        const solver = new WordSearchSolver(input);
        const result = solver.solve();

        // Expected coordinates for 'BONES' (0,0) to (0,4)
        const expectedBones: CharCoordinate[] = [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 0, y: 3 },
            { x: 0, y: 4 },
        ];

        // Expected coordinates for 'KHAN' (2,0) to (2,3)
        const expectedKhan: CharCoordinate[] = [
            { x: 2, y: 0 },
            { x: 2, y: 1 },
            { x: 2, y: 2 },
            { x: 2, y: 3 },
        ];

        // Check if both words were found
        expect(result.has('bones')).toBe(true);
        expect(result.has('khan')).toBe(true);

        // Verify the coordinates for 'BONES'
        expect(result.get('bones')).toEqual(expect.arrayContaining(expectedBones));
        expect(result.get('bones')?.length).toBe(expectedBones.length);


        // Verify the coordinates for 'KHAN'
        expect(result.get('khan')).toEqual(expect.arrayContaining(expectedKhan));
        expect(result.get('khan')?.length).toBe(expectedKhan.length);
    });

    it('should handle words not found in the puzzle', () => {
        const input = `NOTFOUND
A,B,C
D,E,F
D,E,F`;

        const solver = new WordSearchSolver(input);
        const result = solver.solve();

        expect(result.has('notfound')).toBe(false);
        expect(result.size).toBe(0);
    });

    it('should throw an error for invalid input (less than 2 lines)', () => {
        const input = `BONES`;
        expect(() => new WordSearchSolver(input)).toThrow("Invalid Input : Provide at least 2 lines.");
    });

    it('should throw an error if grid width and height are not equal', () => {
        const input = `WORD
A,B
C,D,E`;
        expect(() => new WordSearchSolver(input)).toThrow("Invalid Input : Grid size is incorrect, width and height of the grid must be equal");
    });

    it('should find words in multiple directions (e.g., diagonal, reverse)', () => {
        const input = `HAMZA,LMAO,OLYIA,ORML,FAL,IMME
H,E,L,L,O
Y,A,M,A,L
F,A,M,M,Y
O,A,R,Z,I
J,O,C,K,A
`;
        const solver = new WordSearchSolver(input);
        const result = solver.solve();

        const expHamza: CharCoordinate[] = [
            {
                "x": 0,
                "y": 0
            },
            {
                "x": 1,
                "y": 1
            },
            {
                "x": 2,
                "y": 2
            },
            {
                "x": 3,
                "y": 3
            },
            {
                "x": 4,
                "y": 4
            }

        ];

        expect(result.get('hamza')).toEqual(expect.arrayContaining(expHamza));


        const expLmao: CharCoordinate[] = [
            {
                "x": 0,
                "y": 3
            },
            {
                "x": 1,
                "y": 2
            },
            {
                "x": 2,
                "y": 1
            },
            {
                "x": 3,
                "y": 0
            },
        ];
        expect(result.get('lmao')).toEqual(expect.arrayContaining(expLmao));

        const expOlyia: CharCoordinate[] = [
            {
                "x": 0,
                "y": 4
            },
            {
                "x": 1,
                "y": 4
            },
            {
                "x": 2,
                "y": 4
            },
            {
                "x": 3,
                "y": 4
            },
            {
                "x": 4,
                "y": 4
            },
        ];

        expect(result.get('olyia')).toEqual(expect.arrayContaining(expOlyia));

    });
});