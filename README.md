# My Solution for Kata Word Search

The project contains my solution for the kata word search solution, and the solution is implemented in "[WordSearchSolver.ts](src%2Fkwss%2FWordSearchSolver.ts)".
I've included a UI to interact with the solution and visualize results.

This project was initialized using `npx create-vite`, and this is how it's structured :


```
├── public/                      
├── src/
│   ├── kwss/
│   │   ├── Types.ts                 # TypeScript interfaces (for now used only for CharCoordinate)
│   │   ├── UI.tsx                   # React component for the user interface
│   │   ├── ui.css                   # Tailwind CSS and UI styling
│   │   ├── WordSearchSolver.test.ts # Unit tests for WordSearchSolver
│   │   └── WordSearchSolver.ts      # Core logic for solving the word search puzzle
│   ├── main.tsx                     # Entry point for the React application
│   └── vite-env.d.ts                # Vite environment type definitions
├── index.html                       # Main HTML file
├── package.json                     # Project dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── tsconfig.node.json               # TypeScript configuration for Node environment
└── vite.config.ts                   # Vite build configuration
```


## input

The solution expects the input to be in this format :

- The first line is a comma-separated list of words to look for in the grid
- Subsequent lines representing the grid, where characters are separated by commas.
- Example : 
  - ```
      BONES,KHAN,KIRK,SCOTTY,SPOCK,SULU,UHURA
      U,M,K,H,U,L,K,I,N,V,J,O,C,W,E
      L,L,S,H,K,Z,Z,W,Z,C,G,J,U,Y,G
      H,S,U,P,J,P,R,J,D,H,S,B,X,T,G
      B,R,J,S,O,E,Q,E,T,I,K,K,G,L,E
      A,Y,O,A,G,C,I,R,D,Q,H,R,T,C,D
      S,C,O,T,T,Y,K,Z,R,E,P,P,X,P,F
      B,L,Q,S,L,N,E,E,E,V,U,L,F,M,Z
      O,K,R,I,K,A,M,M,R,M,F,B,A,P,P
      N,U,I,I,Y,H,Q,M,E,M,Q,R,Y,F,S
      E,Y,Z,Y,G,K,Q,J,P,C,Q,W,Y,A,K
      S,J,F,Z,M,Q,I,B,D,B,E,M,K,W,D
      T,G,L,B,H,C,B,E,C,H,T,O,Y,I,K
      O,J,Y,E,U,L,N,C,C,L,Y,B,Z,U,H
      W,Z,M,I,S,U,K,U,R,B,I,D,U,X,S
      K,Y,L,B,Q,Q,P,M,D,F,C,K,E,A,B```
    
## Output
Upon successful solving, the application displays:

A list of each found word, followed by its coordinates in the format (x,y), where x is the row index and y is the column index.

A visual representation of the grid with the found words highlighted in different colors.

Example Output (Textual):

```
BONES   (0,0),(0,1),(0,2),(0,3),(0,4)
KHAN    (2,0),(2,1),(2,2),(2,3)
KIRK    (7,4),(6,5),(5,6),(4,7)
...
```


## Test
The test is implemented using vitest, run `npm test` to start testing