import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Module({ text, rowIndex, colIndex, handleClick, hover, color}) {
  const colorStyles = {
    backgroundColor: `${color}`,
  };
  return (
    <div className="box" onClick={() => handleClick()} onMouseOver={() => hover()} style={colorStyles}>
      <p>{text}</p>
    </div>
  );
}

function Row({ rowData, rowIndex, handleClick, hover, color}) {
  // Use the data passed down from the Board
  const renderTableColumns = (row) => {
    return row.map((item, colIndex) => {
      // Use backticks for template literals
      return <Module key={`cell-${rowIndex}-${colIndex}`} text={item} rowIndex={rowIndex} colIndex={colIndex} handleClick={() => handleClick(colIndex)} hover={() => hover(colIndex)} color={color[colIndex]}/>;
    });
  };

  return <div className="component">{renderTableColumns(rowData)}</div>;
}

export default function Board() {
  const initialize2DArray = (rows, cols, value) => {
    return Array.from({ length: rows }, () => Array(cols).fill(value));
  };
  const defaultGrid = initialize2DArray(9, 9, "");
  const defaultColor = initialize2DArray(9, 9, "black");
  const [color, setColor] = useState(defaultColor);
  const [temp, setTemp] = useState(defaultColor);
  function changeColor(row, col, color1, color2) {
    const newColor = defaultColor.map(row => [...row]); 
    for (let i = 0; i < 9; i++){
      newColor[i][col] = color1;
    }
    for (let j = 0; j < 9; j++){
      newColor[row][j] = color1;
    }
    newColor[row][col] = color2;
    setColor(newColor);
  };
  function hoverColor(row, col, color1, color2) {
    const tempColor = color.map(row => [...row]); 
    for (let i = 0; i < 9; i++){
      tempColor[i][col] = color1;
    }
    for (let j = 0; j < 9; j++){
      tempColor[row][j] = color1;
    }
    tempColor[row][col] = color2;
    setTemp(tempColor);
  };
  // Note: In a real app, you'd likely wrap this in useState 
  // if the grid is meant to change over time.
  const [grid, setGrid] = useState(defaultGrid);
  const [selected, setSelected] = useState([0, 0]);
  function handleClick(row, col) {
    setSelected([row, col]);
    changeColor(row, col, "LightBlue", "lightgreen");
  };
  function hover(row, col) {
    setSelected([row, col]);
    changeColor(row, col, "green", "purple");
  };
  const renderTableRows = (data) => {
    return data.map((rowItem, index) => {
      return (
        <Row 
          key={`row-${index}`} 
          rowData={rowItem} 
          rowIndex={index} 
          handleClick={(col) => handleClick(index, col)}
          hover={(col) => hover(index, col)}
          color = {temp[index]}
        />
      );
    });
  };

  return <div className="board-container">{renderTableRows(grid)}</div>;
}
