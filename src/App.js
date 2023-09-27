import { useEffect, useState } from 'react';
import nowDate from './components/Date';
import './App.css';
import Cell from './components/Cell';
import { scryRenderedDOMComponentsWithClass } from 'react-dom/test-utils';

function App() {
  const matrix = [];
  const numRows = 51;
  const numColumns = 7;
  let monthArr = ['Янв.', 'Февр.', 'Март.', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сент.', 'Окт.', 'Нояб.', 'Дек.']
  const [timeObj, setTimeObj] = useState({})
  const [allObj, setAllObj] = useState({})
  const [colorArr, setColorArr] = useState([])
  const [dateArr, setDateArr] = useState([])
  const now = new Date()
  const [dateOfTheWeek, setDateOfTheWeek] = useState(now.getDay()) //now.getDay()
  const [hiddenDays, setHiddenDays] = useState(357 - dateOfTheWeek)
  const numMonth = now.getMonth() + 1
  const trueMonthArr = [...monthArr.slice(-(12 - numMonth)), ...monthArr.slice(0, numMonth)]

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
        setDateArr(Object.keys(updateAllObj).slice(0, hiddenDays).reverse())
        setColorArr(Object.values(updateAllObj).slice(0, hiddenDays).reverse())
      })
      .catch(err => console.log(err))
  }, [])

  function buttonClick() {
    console.log(allObj)
  }

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
