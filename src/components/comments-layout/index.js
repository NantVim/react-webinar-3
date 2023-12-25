import { memo } from 'react';
import './style.css'

function CommentsLayout({children}) {
    return(
        <div className='CommentsLayout'>
            {children}
        </div>
    )
}

export default memo(CommentsLayout);