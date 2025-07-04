import type {CharCoordinate} from "./Types.ts";

export default class WordSearchSolver {
    // represents the valid grid of the puzzle
    grid : string[][];

    // list of words to find (cleaned and lowercase
    words: string[];

    //list of possible search directions simplified in this array :)
    seacrhDirections : CharCoordinate[] = [
        {y : 0, x : 1}, //      right
        {y : 0, x : -1}, //     left
        {y : -1, x : 0}, //     up
        {y : 1, x : 0}, //      down
        {y : 1, x : 1}, //      down-right
        {y : 1, x : -1}, //     down-left
        {y : -1, x : -1},//     up-left
        {y : -1, x : 1},//      up-right
    ]

    /*
    * Solver for the KATA Word Search, will take input raw as described in the readme of the quiz
    * @param rawInput same format as in the quiz details.
    * */
    constructor(rawInput: string) {
        const parseResult = this.parseRawInput(rawInput);

        this.grid = parseResult.grid;
        this.words = parseResult.words;

    }

    /*
    * this method will try to parse the raw input and return an object with the valid grid and the words to look for
    * @throws validation errors to be shown for the user.
    * @param input same format as in the quiz details.
    * */
    protected parseRawInput(input: string):{grid:string[][], words:string[]} {

        // extract clean string lines
        const lines:string[] = input.trim().split(/\n/);

        //validation for bare minimum
        if(lines.length < 2){
            throw new Error("Invalid Input : Provide at least 2 lines.");
        }

        // extracting the clean words to look for
        const words: string[] = lines[0].split(',').map(word => word.trim().toLowerCase());

        // in case no words found which will mean incorrect format provided
        if(words.length < 1){
            throw new Error("Invalid Input : Couldn't detect any words to search for");
        }

        // extract the grid lines
        const gridLines = lines.slice(1);

        // constructing the grid multidimensional array
        const grid : string[][] = gridLines.map(row => row.split(',').map(char => char.trim().toLowerCase()));

        // basic validation
        if(grid.length === 0){
            throw new Error("Invalid Input : It appears that your grid is empty");
        }

        // let's check one of the lines are not in the same size as the grid
        for(const row of grid){
            if(row.length !== grid.length){
                throw new Error(`Invalid Input : Grid size is incorrect, width and height of the grid must be equal`);
            }
        }

        return {
            grid, words
        }
    }


    solve():Map<string, CharCoordinate[]>{

        // final result variable
        const result = new Map<string, CharCoordinate[]>();

        for(const word of this.words){

            // used to skip iterations of the grid when the word is found.
            let wordFound = false;

            for(let r = 0; r < this.grid.length; r++){

                for(let c = 0; c < this.grid.length;c++){

                    for(const direction of this.seacrhDirections){

                        const wordPath = this.searchInDirection(r, c, word, direction);
                        
                        if(wordPath && wordPath.length){
                            
                            result.set(word, wordPath);

                            wordFound = true;

                            break;
                        }

                    }

                    if(wordFound) break;

                }

                if(wordFound) break;

            }


        }


        return result;
    }



    /*
        * this method used for searching in any of the declared directions, starting from any coordinate
        * @param row starting x point
        * @param col starting y point
        * @param direction in which the search should go, eg: {0, 1} means right
        *
        * */
    protected searchInDirection = (row:number, col:number, word:string, direction: CharCoordinate): CharCoordinate[]|null => {

        //final result to be returned when word is found
        const result: CharCoordinate[] = [];


        //
        for(let i = 0; i < word.length; i++){

            const currRow = row + i * direction.x;
            const currCol = col + i * direction.y;

            // return null when coordinates are invalid
            if(currRow < 0 || currRow >= this.grid.length || currCol < 0 || currCol >= this.grid.length){
                return null;
            }

            // return null when we encounter first unequal char
            if(this.grid[currRow][currCol] !== word[i]){
                return null;
            }


            // at this point the char(s) are correct so we keep storing coordinates
            result.push({x : currRow, y : currCol});

        }


        return result;
    }


}