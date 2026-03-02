import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Module({text}) {
return (
<div className = "box">
<p> {text}, </p>
</div>);
}
function Row( {text, rowIndex} ) {
const renderTableColumns = (chunk) => {
return chunk.map((item, index) => {
return (<Module key={'col-${index}'} text={item}/>);
});
};
return (<div className = "component"> {renderTableColumns(item)} </div>);
}
export default function Board() {
const initialize2DArray = (rows, cols) => {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
};
const Grid = initialize2DArray(9, 9);
const renderTableRows = (data) => {
return data.map((rowItem, index) => {
return (<Row key={'row-${index}'} text={rowItem} rowIndex={index} /> );
});
};
return <div className="board-container"> {renderTableRows(Grid)} </div>;
}
