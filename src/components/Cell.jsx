import React, { useState } from 'react';
import corner from '../corner.svg'

const Cell = (props) => {
    const { cell, dateTimeArray } = props
    const [showTooltip, setShowToolpit] = useState(false)

    return (
        <span
            className='App__cell'
            onMouseEnter={() => setShowToolpit(true)}
            onMouseLeave={() => setShowToolpit(false)}
            onClick={() => console.log(dateTimeArray)}
        >
            <span className='App__cell'></span>
            {showTooltip ?
                <span className='App__cell_visible'>
                    25 contributions
                    <div className='App__cell_br'>{dateTimeArray}
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