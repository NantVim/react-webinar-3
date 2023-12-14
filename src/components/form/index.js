import {memo} from 'react';
import Input from '../input';
import 'style.css';

function Form({items, formData, title, onInput, actionTitle, action, error}) {
    return(
        <div className='Form'>
            <strong className='Form-title'>{title}</strong>
            {items.map(item => (
                <div key={item.key} className='Form-item'>
                    <span className='item-label'>{item.title}</span>
                    <Input value={item.value} onChange={item.action} type={item.type}/>
                </div>
            ))}
            <span className='Form-error'>{error}</span>
            <button className='Form-action' onClick={action}>{actionTitle}</button>
        </div>
    )
}

export default memo(Form);