import { useState, useEffect } from 'react';
import './App.css';

function Module({ text, handleClick, handleHover, color }) {
  return (
    <div 
      className="box" 
      onClick={handleClick} 
      onMouseEnter={handleHover} 
      style={{ backgroundColor: color }}
    >
      <p>{text}</p>
    </div>
  );
}

function Board({grid, setGrid}) {
  const [selected, setSelected] = useState(null); // {r, c}
  const [hovered, setHovered] = useState(null);   // {r, c}
  const [lastKeyPressed, setLastKeyPressed] = useState('None yet');
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { r, c } = selected;

      // 1. Handle Navigation (Arrow Keys)
      if (event.key === 'k' || event.key === 'ArrowUp')    setSelected({ r: (((r-1)%9)+9)%9, c });
      if (event.key === 'j' || event.key === 'ArrowDown')  setSelected({ r: (((r+1)%9)+9)%9, c });
      if (event.key === 'h' || event.key === 'ArrowLeft')  setSelected({ r, c:  (((c-1)%9)+9)%9 });
      if (event.key === 'l' || event.key === 'ArrowRight') setSelected({ r, c: (((c+1)%9)+9)%9 });

      // 2. Handle Data Entry (Numbers 1-9)
      if (event.key >= 1 && event.key <= 9) {
        const newGrid = grid.map((row, rIdx) => 
          row.map((cell, cIdx) => (rIdx === r && cIdx === c ? event.key : cell))
        );
        setGrid(newGrid);
      }

      // 3. Handle Deletion (Backspace/Delete)
      if (event.key === 'Backspace' || event.key === 'Delete') {
        const newGrid = grid.map((row, rIdx) => 
          row.map((cell, cIdx) => (rIdx === r && cIdx === c ? "" : cell))
        );
        setGrid(newGrid);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected, grid]);

  const getCellColor = (r, c) => {

    // 1. Check for Hover (Temporary) - Overrides selection visual if you prefer
    if (hovered) {
      if (r === hovered.r && c === hovered.c) return "white";
      if (r === hovered.r || c === hovered.c) return "lightskyblue";
    }

    // 2. Check for Selection (Persistent)
    if (selected) {
      if (r === selected.r && c === selected.c) return "lightgreen";
      if (r === selected.r || c === selected.c) return "LightBlue";
    }

    return "white"; // Default background
  };

  return (
    <div className="board-container" onMouseLeave={() => setHovered(null)}>
      {grid.map((row, rIndex) => (
        <div key={`row-${rIndex}`} className="component">
          {row.map((cell, cIndex) => (
            <Module
              key={`${rIndex}-${cIndex}`}
              text={cell}
              color={getCellColor(rIndex, cIndex)}
              handleClick={() => setSelected({ r: rIndex, c: cIndex })}
              handleHover={() => setHovered({ r: rIndex, c: cIndex })}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function All() {
  const [grid, setGrid] = useState(Array(9).fill("").map(() => Array(9).fill("")));
  const [finalgrid, setFinalGrid] = useState(Array(9).fill("").map(() => Array(9).fill("")));
  function numinRow(grid, num, row) {
    for (let col = 0; col < 9; col++){
          
    }
  }
  return (
    <div className = "all">
    <Board grid = {grid} setGrid = {(value) => setGrid(value)}/>
    <button className = "button"> Solve </button>
    <Board grid = {finalgrid} setGrid = {(value) => setFinalGrid(value)}/>
    </div>
  );
}
