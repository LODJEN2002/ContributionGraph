import React, { useState } from 'react';
import corner from '../corner.svg'


const Cell = (props) => {
    const { cellIndex, columnIndex, date, colorCell, dateOfTheWeek } = props
    const [showTooltip, setShowToolpit] = useState(false)
    let teg = 'App__cell'

    if (colorCell > 0) {
        teg = 'App__cell-3'
    }
    if (colorCell > 10) {
        teg = 'App__cell-6'
    }
    if (colorCell > 19) {
        teg = 'App__cell-9'
    }
    if (colorCell > 29) {
        teg = 'App__cell-12'
    }

    function clickCell() {
        console.log(columnIndex + ' columnIndex')
        console.log(cellIndex + ' cellIndex')
    }

    if (cellIndex <= 350 + dateOfTheWeek) {
        return (
            <span
                className={teg}
                onMouseEnter={() => setShowToolpit(true)}
                onMouseLeave={() => setShowToolpit(false)}
                onClick={() => clickCell()}
            >
                <span
                    className='App__cell'
                ></span>
                {showTooltip ?
                    <span className='App__cell_visible'>
                        {colorCell} contributions <br /> {date}
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
