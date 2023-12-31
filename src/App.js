import { useEffect, useState } from 'react';
import nowDate from './components/Date';
import './App.css';
import Cell from './components/Cell';

function App() {
  const now = new Date()
  const matrix = [];
  const numRows = 51;
  const numColumns = 7;
  const [timeObj, setTimeObj] = useState({})
  const [allObj, setAllObj] = useState({})
  const [dateArr, setDateArr] = useState([])
  // Работа с данными месяцов
  const dateOfTheWeek = now.getDay() //now.getDay()
  const hiddenDays = 350 + dateOfTheWeek
  //Работа с месяцами (верх. планка)
  let monthArr = ['Янв.', 'Февр.', 'Март.', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сент.', 'Окт.', 'Нояб.', 'Дек.']
  const numMonth = now.getMonth() + 1
  const trueMonthArr = [...monthArr.slice(-(12 - numMonth))]
  const [colorArr, setColorArr] = useState([])

  console.log(trueMonthArr)

  for (let i = 0; i < numColumns; i++) {
    matrix[i] = [];

    for (let j = 0; j < numRows; j++) {
      matrix[i][j] = j * numColumns + i + 1;
    }
  }

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
        setDateArr(Object.keys(updateAllObj).slice(0, hiddenDays + 1).reverse())
        setColorArr(Object.values(updateAllObj).slice(0, hiddenDays + 1).reverse())
      })
      .catch(err => console.log(err))
  }, [])


  return (
    <div className="App">
      <div className='App__container_day_of_the_week'>
        <div className='App__day_of_the_week App__day_of_the_week-first'>Пн</div>
        <div className='App__day_of_the_week'>Ср</div>
        <div className='App__day_of_the_week'>Пт</div>
      </div>
      <div>
        <div className='App__months'>
          {
            trueMonthArr.map((i) => (
              <div className='App__month' key={i}>{i}</div>
            ))
          }
        </div>
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
      </div>
    </div>
  );
}


export default App;
