import React, { useState } from 'react';
import corner from '../corner.svg'


const Cell = (props) => {
    const { cellIndex, columnIndex, date, colorCell, dateOfTheWeek } = props
    const [showTooltip, setShowToolpit] = useState(false)
    let className = 'App__cell'
    let day = ''

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
        day = 'Пн'
    }
    if (cellIndex % 7 === 2) {
        day = 'Вт'
    }
    if (cellIndex % 7 === 3) {
        day = 'Ср'
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
        day = 'Вс'
    }
    
    function clickCell() {
        console.log(columnIndex + ' columnIndex')
        console.log(cellIndex + ' cellIndex')
        console.log(cellIndex % 7 === 1 ? 'pn' : 'no')
    }

    if (cellIndex <= 350 + dateOfTheWeek) {
        return (
            <span
                className={className}
                onMouseEnter={() => setShowToolpit(true)}
                onMouseLeave={() => setShowToolpit(false)}
                onClick={() => clickCell()}
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
                            {day + date}
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
