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

  for (let i = 0; i < numColumns; i++) {
    matrix[i] = [];

    for (let j = 0; j < numRows; j++) {
      matrix[i][j] = j * numColumns + i + 1;
    }
  }

  // console.log(nowDate)

  // console.log(new Date())

  // console.log(matrix)

  let now = new Date()

  // console.log(new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).getDate())

  useEffect(() => {
    // let objectTime = {}
    let daysAYear = 3


    for (let i = 0; i <= daysAYear; i++) {
      let date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)

      const year = date.getFullYear()
      const month = String(date.getMonth()).padStart(2, '0')
      // const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0')

      let constructorDate = year + '-' + month + '-' + day
      // console.log(constructorDate)
      // console.log(i)   
      // console.log(date.getDate())
      // objectTime.push(date)
      // console.log(objectTime)
      objectTime[constructorDate] =''  
      console.log(objectTime)

    }
  }, [])




  let testObj2 = {
    '2023-08-06': 229
  }


  // console.log(now.getFullYear() + '-' + now.getMonth() + '-' + now.getDay())
  // console.log(now.getTime())

  useEffect(() => {
    fetch("https://dpg.gg/test/calendar.json", {
      method: 'GET',
      // headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(res => setTimeObj(res))
    // .then(res => console.log(res))
  }, [])


  // console.log(testObj)


  function buttonClick() {
    console.log({ ...timeObj, ...testObj2 })
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
            />
          ))}
        </div>
      ))}
      <button onClick={buttonClick}>Click</button>
    </div>
  );
}


export default App;
