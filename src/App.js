import { useEffect, useState } from 'react';
import nowDate from './components/Date';
import './App.css';
import Cell from './components/Cell';

function App() {
  const matrix = [];
  const numRows = 51;
  const numColumns = 7;
  const objectTime = {}
  const [timeObj, setTimeObj] = useState({})
  const [allObj, setAllObj] = useState({})
  const [dateArr, setDateArr ] = useState([])

  for (let i = 0; i < numColumns; i++) {
    matrix[i] = [];

    for (let j = 0; j < numRows; j++) {
      matrix[i][j] = j * numColumns + i + 1;
    }
  }

  let now = new Date()
  let daysAYear = 450

  for (let i = 0; i <= daysAYear; i++) {
    let date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)

    const year = date.getFullYear()
    const month = String(date.getMonth()).padStart(2, '0')
    // const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0')

    let constructorDate = year + '-' + month + '-' + day
    objectTime[constructorDate] = 0
  }

  // console.log(objectTime) // 2022-08-15 first date

  useEffect(() => {
    fetch("https://dpg.gg/test/calendar.json", {
      method: 'GET',
      // headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(res => setTimeObj(res))
      .then(setAllObj({ ...objectTime, ...timeObj }))
      .then(console.log(allObj))
      .then(setDateArr(Object.keys(allObj)))
    // .then(res => console.log(res))
  }, [])

  console.log(allObj)

  function buttonClick() {
    const unitedObject = { ...objectTime, ...timeObj }
    // console.log(unitedObject)
    console.log(allObj)
    // console.log(Object.keys(unitedObject))
    // console.log(Object.keys(timeObj))
    // console.log(testObj2)
  }

  return (
    <div className="App">
      {matrix.map((row, rowIndex) => (
        <div
          className='App__row' key={rowIndex}>
          {row.map((cell, columnIndex) => (
            <Cell
              key={columnIndex}
              cellIndex={cell}
              columnIndex={columnIndex}
              date={dateArr[cell]}
            />
          ))}
        </div>
      ))}
      <button onClick={buttonClick}>Click</button>
    </div>
  );
}


export default App;
