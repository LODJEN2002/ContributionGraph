import { useEffect, useState } from 'react';
import nowDate from './components/Date';
import './App.css';
import Cell from './components/Cell';
import { scryRenderedDOMComponentsWithClass } from 'react-dom/test-utils';


// У нас есть все числа(i), поэтому если вторник то минус 5,
//  в нутри функциональный комп.
// проверяешь если его i, то тогда баним его через  тернальные
//  операторы ? true : false 



function App() {
  const matrix = [];
  const numRows = 51;
  const numColumns = 7;
  const [timeObj, setTimeObj] = useState({})
  const [allObj, setAllObj] = useState({})
  const [colorArr, setColorArr] = useState([])
  const [dateArr, setDateArr] = useState([])
  const now = new Date()
  const [dateOfTheWeek , setDateOfTheWeek] = useState(now.getDay())

  
  for (let i = 0; i < numColumns; i++) {
    matrix[i] = [];

    for (let j = 0; j < numRows; j++) {
      matrix[i][j] = j * numColumns + i + 1;
    }
  }
  // console.log(now.getDay())
  // setDateOfTheWeek()

//   function func(num) {
//     let matrix = []
//     for(let i = 0; i < num; i++){
//       matrix[num][num] = num*num  // ctr + backspace = delite word
//     }

//     return matrix
//   }
// console.log(func(7))

  function createObjectTime() {
    const now = new Date()

    const daysAYear = 365
    const objectTime = {}

    for (let i = 0; i <= daysAYear; i++) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const constructorDate = year + '-' + month + '-' + day
      objectTime[constructorDate] = 0
    }

    return objectTime
  }

  // console.log(objectTime) // 2022-08-15 first date

  useEffect(() => {
    const objectTime = createObjectTime()

    fetch("https://dpg.gg/test/calendar.json", {
      method: 'GET',
      // headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(res => {
        setTimeObj(res)
        const updateAllObj = { ...objectTime, ...res }
        setAllObj(updateAllObj)
        setDateArr(Object.keys(updateAllObj).slice(0, 358).reverse())
        setColorArr(Object.values(updateAllObj).slice(0,358).reverse())
        // setDateArr(Object.keys(updateAllObj).reverse())
        // console.log(updateAllObj)
      })
      .catch(err => console.log(err))
  }, [])

  // function qwe() {
  //   // const sum = Object.keys(allObj).length - dateArr.length
  //   const qwe = Object.entries(allObj)
  //   const asd = Object.fromEntries(qwe.slice(0, -44))
  //   // return Object.keys(allObj).length
  //   return asd
  // }

  // const qweasd = Object.entries(allObj)
  //   const asd = Object.fromEntries(qweasd.slice(0, -44))

  //   console.log(asd)
  // // console.log(qwe())
  // console.log(Object.entries(allObj).slice(0, -2))

  function buttonClick() {
    console.log(allObj)
    // console.log(dateArr)
    // console.log(dateArr.reverse().slice(0, 350))
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
              colorCell={colorArr[cell]}
              dateOfTheWeek={dateOfTheWeek}
            />
          ))}
        </div>
      ))}
      <button onClick={buttonClick}>Click</button>
    </div>
  );
}


export default App;
