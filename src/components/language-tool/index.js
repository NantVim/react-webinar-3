import {memo} from 'react';
import 'style.css';

function LanguageTool({dictionary, changeLang}) {
    return(
        <div className='LanguageTool'>
            <button onClick={() => changeLang()} className='LanguageTool-item'>{dictionary}</button>
        </div>
    );
}

export default memo(LanguageTool);