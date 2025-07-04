import "./ui.css";
import {useState} from "react";
import WordSearchSolver from "./WordSearchSolver.ts";
import type {CharCoordinate} from "./Types.ts";
import type { JSX } from "react/jsx-runtime";

/* eslint-disable  @typescript-eslint/no-explicit-any */

function UI() {

    const example = `BONES,KHAN,KIRK,SCOTTY,SPOCK,SULU,UHURA
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
K,Y,L,B,Q,Q,P,M,D,F,C,K,E,A,B`;

    const [input, setInput] = useState(example);
    const [solver, setSolver] = useState<WordSearchSolver>();
    const [result, setResult] = useState<Map<string, CharCoordinate[]>>();
    const [view, setView] = useState('input'); //can be 'input' or 'result'
    const [error, setError] = useState('');

    const previewColors = [
        '#ffc6c6',
        '#ffedc6',
        '#f5ffc6',
        '#caffc6',
        '#c6e5ff',
        '#d6c6ff',
        '#efc6ff',
        '#ffc6f2',
        '#ffc6d5',
    ];


    const handleSolveClick = () => {

        try {

            const solverInst = new WordSearchSolver(input);

            const result = solverInst.solve();

            if (result) {
                setResult(result);
                setSolver(solverInst);
                setView('result');
            }


        } catch (ex:any) {
            setError(ex.message);
        }
    }

    const renderResultText = () => {

        const res: JSX.Element[] = [];
        let colorIndex = 0;

        result?.forEach((coordinates, word)=>{
            res.push(<div className={'mb-0.5'}>
                <b className={'p-0.5'} style={{backgroundColor: previewColors[colorIndex]}}>{word.toUpperCase()}</b>
                {`\t` + coordinates.map(c => `(${c.x},${c.y})`).join(',')}
            </div>);

            colorIndex++;
        })

        return res;

    }

    const renderResultView = ()=>{
        if(!solver || !result) return null;

        return (
            <div className="side-preview flex-1 min-h-80 min-w-80">

                <div className="result-container">
                    <h2 className="text-gray-700 font-bold text-xl mb-4">Result :</h2>

                    <div
                        className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-auto whitespace-pre-wrap font-mono text-sm text-gray-800">
                        {renderResultText()}
                    </div>

                    <div className="grid-preview mt-8">

                        {solver.grid.map((row, x) => {

                            return <div className="gp-row">
                                {row.map((char, y) => {

                                    let color = null,
                                        colorIndex = 0;

                                    result.forEach((coordinates) => {

                                        coordinates.forEach(coordinate => {

                                            if (coordinate.x === x && coordinate.y === y) {

                                                color = previewColors[colorIndex];

                                            }

                                        });

                                        colorIndex++;
                                    })

                                    return <div style={color ? {backgroundColor: color} : {}} className={`gp-col ${color ? 'h' : ''}`}>{char}</div>
                                })}
                            </div>

                        })}


                    </div>
                </div>


            </div>
        );
    }

    const renderInputView = () => {
        return (
            <div className="flex-1 min-h-80 min-w-80">

                <p>Provide your raw text of the puzzle, the text format should be just as described <a target={'_blank'}
                                                                                                       href={"https://github.com/Manna-Technologies/kata-word-search?tab=readme-ov-file#input"}>in
                    the quiz readme</a></p>


                <textarea onChange={e => setInput(e.target.value)} value={input}
                          className={"p-2 border-blue-100 border-2 rounded mt-8 w-full h-52"}></textarea>
                <p className={'text-gray-400 mb-8'}>You can generate puzzles from <a className={'text-gray-400'}
                                                                                     target={'_blank'}
                                                                                     href="https://puzzlemaker.discoveryeducation.com/word-search">Puzzlemaker</a>
                </p>

                {error && <div className="p-2 rounded bg-red-200 text-red-900 mb-8">{error}</div>}

                <button onClick={handleSolveClick}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition duration-300 ease-in-out shadow-md">
                    Solve!
                </button>


            </div>
        )
    }

    const tmpNavButton = () => {
        return view === 'input' ? null : (
            <button
                onClick={() => setView('input')}
                style={{padding: '4px 8px'}}
                className={'bg-blue-600 duration-300 ease-in-out font-bold hover:bg-blue-700 rounded-xl shadow-md text-white transition'}>
                Return
            </button>
        );
    }


    return (
        <div
            className="min-w-screen container min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-inter text-gray-800">
            <div className="container bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">


                <div className="flex items-start">
                    <h1 style={{fontSize: '2rem'}} className="flex-1 title text-2xl font-bold text-gray-800 mb-6">Kata
                        Word Search Solution</h1>
                    {tmpNavButton()}
                </div>

                <div className="flex flex-col md:flex-row">

                    {
                        view === 'result' && result && solver ? renderResultView() : renderInputView()
                    }

                </div>


            </div>
        </div>
    )
}

export default UI
