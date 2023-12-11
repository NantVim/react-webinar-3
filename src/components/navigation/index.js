import {memo} from 'react';
import { Link } from 'react-router-dom';
import './style.css'

function Navigation({dictionary}) {
    return(
        <div className='Navigation'>
            <span className={'Navigation-item'}>
                <Link to='/'>{dictionary.home}</Link>
            </span>
        </div>
    )
}

export default memo(Navigation);