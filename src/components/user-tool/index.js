import {memo} from 'react';
import {Link} from "react-router-dom";
import './style.css';

function UserTool() {
    return(
        <div className='UserTool'>
            <Link to='/profile'>User</Link>
            <button><Link to='/login'>Воход</Link></button>
        </div>
    );
}

export default memo(UserTool);