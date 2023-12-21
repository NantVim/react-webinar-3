import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import parseDate from '../../utils/parse-date';
import './style.css'

function CommentsItem({ data }) {
    if (!data.children) return (''); 

    const cn = bem('CommentsItem');
    return (
        <div className={cn()}>
            <div className={cn('head')}>
                <span className={cn('name')}>{data.author.profile.name}</span>
                <span className={cn('date')}>{parseDate(data.dateCreate)}</span>
            </div>
            <div className={cn('content')}>{data.text}</div>
            <div className={cn('action')}>Ответить</div>
            <div className={cn('answer')}>
                {data.children.map((item, index) => (<CommentsItem data={item} key={index}/>))}
            </div>
        </div>
    );
}

export default memo(CommentsItem);