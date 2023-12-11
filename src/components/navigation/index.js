import {memo} from 'react';
import { Link } from 'react-router-dom';
import './style.css'

function Navigation() {
    return(
        <div className='Navigation'>
            <span className={'Navigation-item'}>
                <Link to='/'>Главная</Link>
            </span>
        </div>
    )
}

export default memo(Navigation);