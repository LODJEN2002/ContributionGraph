import React, { useEffect, useState } from 'react';
import corner from '../corner.svg'


const Cell = (props) => {
    const { cellIndex, columnIndex, date, colorCell, dateOfTheWeek } = props
    const [showTooltip, setShowToolpit] = useState(false)
    let className = 'App__cell'
    let day = ''

    // Создаем объект, в котором ключи - это пороговые значения colorCell, а значения - соответствующие классы
    let thresholds = {
        0: 'App__cell-3',
        10: 'App__cell-6',
        19: 'App__cell-9',
        29: 'App__cell-12'
    };

    let highestThreshold = 0
    for (let threshold in thresholds) {
        if (colorCell > threshold) {
            highestThreshold = threshold
        }
    }

    if (colorCell > 0) {
        className = 'App__cell-3'
    }
    if (colorCell > 10) {
        className = 'App__cell-6'
    }
    if (colorCell > 19) {
        className = 'App__cell-9'
    }
    if (colorCell > 29) {
        className = 'App__cell-12'
    }


    if (cellIndex % 7 === 1) {
        day = 'Понедельник'
    }
    if (cellIndex % 7 === 2) {
        day = 'Вторник'
    }
    if (cellIndex % 7 === 3) {
        day = 'Среда'
    }
    if (cellIndex % 7 === 4) {
        day = 'Четверг'
    }
    if (cellIndex % 7 === 5) {
        day = 'Пятница'
    }
    if (cellIndex % 7 === 6) {
        day = 'Суббота'
    }
    if (cellIndex % 7 === 0) {
        day = 'Воскресение'
    }

    function qwe(date) {
        let month = date.slice(5, 7)
        if (month === '01') {
            month = 'Январь'
        }
        if (month === '02') {
            month = 'Февраль'
        }
        if (month === '03') {
            month = 'Март'
        }
        if (month === '04') {
            month = 'Апрель'
        }
        if (month === '05') {
            month = 'Май'
        }
        if (month === '06') {
            month = 'Июнь'
        }
        if (month === '07') {
            month = 'Июль'
        }
        if (month === '08') {
            month = 'Август'
        }
        if (month === '09') {
            month = 'Сентябрь'
        }
        if (month === '10') {
            month = 'Октябрь'
        }
        if (month === '11') {
            month = 'Ноябрь'
        }
        if (month === '12') {
            month = 'Декабрь'
        }
        return month
    }

    if (cellIndex <= 350 + dateOfTheWeek) {
        return (
            <span
                className={className}
                onMouseEnter={() => setShowToolpit(true)}
                onMouseLeave={() => setShowToolpit(false)}
            >
                <span
                    className='App__cell'
                ></span>
                {showTooltip ?
                    <span className='App__cell_visible'
                        onMouseEnter={() => setShowToolpit(false)}
                    >
                        {colorCell} contributions <br />
                        <div className='App__cell_visible_date'>
                            {day + ', ' + qwe(date) + ' ' + date.slice(-2) + ', ' + date.slice(0, 4)}
                        </div>
                        <div className='App__cell_br'>{ }
                            <img className='qwe' src={corner} alt="corner" />
                        </div>
                    </span>
                    :
                    ''
                }
            </span>

        );
    }
};

export default Cell;
