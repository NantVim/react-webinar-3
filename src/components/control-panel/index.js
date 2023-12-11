import {memo} from 'react';
import './style.css'

function ControlPanel({children}) {
    return(
        <div className='ControlPanel'>
            {children}
        </div>
    )
}

export default memo(ControlPanel);