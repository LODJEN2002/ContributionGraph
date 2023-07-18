import { useEffect, useState } from 'react';
import './App.css';
import Cell from './components/Cell';

function App() {
  const [dateTimeArray, setDateTimeArray] = useState({});
  const [arr, setArr] = useState({});

  const date = new Date()
  date.setMonth(7)

  const matrix = [];
  const numRows = 51;
  const numColumns = 7;
  for (let i = 0; i < numColumns; i++) {
    matrix[i] = [];

    for (let j = 0; j < numRows; j++) {
      matrix[i][j] = j * numColumns + i + 1;
    }
  }

  useEffect(() => {
    const today = new Date(); 
    const numDays = 357; 
  
    const newDateTimeArray = {};
    for (let i = numDays; i >= 0; i--) {
      const currentDate = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
  
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
  
      const dateTimeString = `${year}-${month}-${day}: `;
      currentDate.setHours(0, 0, 0, 0);
      newDateTimeArray[dateTimeString] = currentDate;
    }
  
    setDateTimeArray(newDateTimeArray);
    console.log(dateTimeArray);
  }, []);

  useEffect(() => {
    fetch("https://dpg.gg/test/calendar.json", {
      method: 'GET',
      // headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(res => res)
      .then(res => {
        setArr({ ...dateTimeArray, ...res });
      })
      .then(console.log(arr))
  }, [])


  function qwe() {
    // console.log(dateTimeArray)
    console.log(dateTimeArray)
    console.log(arr)
    // console.log(dateTimeArray)

  }

  // useEffect(() => {
  // },[])

  return (
    <div className="App">
      {matrix.map((row, rowIndex) => (
        <div
          className='App__row' key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <Cell
              dateTimeArray={dateTimeArray[cell]}
              key={cellIndex}
              cell={cell}
              cellIndex={cellIndex}
              date={date}
            />
          ))}
        </div>
      ))}
      <button onClick={qwe}>asd</button>
    </div>
  );
}


export default App;
