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
const ModuleComponent = [];
for (let count = 0; count < 5; count++){

ModuleComponent.push(<Module text = {text[count]}/>);
}
return <div className = "component">{ModuleComponent}</div>;
return <Game/>;
}
export default function Board() {
const initialize2DArray = (rows, cols) => {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
};
const board = initializeArray(9, 9);
const renderTableRows = (dataArray) => {
return dataArray.map((rowItem, index) => {
return <Row key={rowItem.id} item={rowItem} rowIndex={index} />;
});
};
}
