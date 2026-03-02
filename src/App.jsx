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

export default function Board() {
  const [grid] = useState(Array(9).fill("").map(() => Array(9).fill("")));
  const [selected, setSelected] = useState(null); // {r, c}
  const [hovered, setHovered] = useState(null);   // {r, c}
  const [lastKeyPressed, setLastKeyPressed] = useState('None yet');
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { r, c } = selected;

      // 1. Handle Navigation (Arrow Keys)
      if (event.key === 'ArrowUp')    setSelected({ r: Math.max(0, r - 1), c });
      if (event.key === 'ArrowDown')  setSelected({ r: Math.min(8, r + 1), c });
      if (event.key === 'ArrowLeft')  setSelected({ r, c: Math.max(0, c - 1) });
      if (event.key === 'ArrowRight') setSelected({ r, c: Math.min(8, c + 1) });

      // 2. Handle Data Entry (Numbers 1-9)
      if (/^[1-9]$/.test(event.key)) {
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
      if (r === hovered.r && c === hovered.c) return "purple";
      if (r === hovered.r || c === hovered.c) return "green";
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
