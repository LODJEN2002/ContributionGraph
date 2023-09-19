import React, { useState } from 'react';
import corner from '../corner.svg'

const Cell = (props) => {
    const { cellIndex, columnIndex,date } = props
    const [showTooltip, setShowToolpit] = useState(false)

    function clickCell() {
        console.log(columnIndex)
        console.log(cellIndex)
    }

    return (
        <span
            className='App__cell'
            onMouseEnter={() => setShowToolpit(true)}
            onMouseLeave={() => setShowToolpit(false)}
            onClick={() => clickCell()}
        >
            <span
                className='App__cell'
            ></span>
            {showTooltip ?
                <span className='App__cell_visible'>
                    {cellIndex} contributions {date}
                    <div className='App__cell_br'>{ }
                        <img className='qwe' src={corner} alt="corner" />
                    </div>
                </span>
                :
                ''
            }
        </span>
    );
};

export default Cell;