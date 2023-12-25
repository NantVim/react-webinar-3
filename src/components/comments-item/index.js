import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import parseDate from '../../utils/parse-date';
import useTranslate from '../../hooks/use-translate';
import './style.css'
import CommentsInput from '../comments-input';

function CommentsItem({ data, onInput, openInput, openId, i, onCancel, sendComment, inputValue, exists}) {
    if (!data.children) return (''); 

    const gap = i<=5? 'answer-gap' : 'answer';
    const cn = bem('CommentsItem');
    // Функция для локализации текстов
    const { t } = useTranslate();

    return (
        <div className={cn()}>
            <div className={cn('head')}>
                <span className={cn('name')}>{data.author.profile.name}</span>
                <span className={cn('date')}>{parseDate(data.dateCreate)}</span>
            </div>
            <div className={cn('content')}>{data.text}</div>
            <div className={cn('action')} onClick={() => openInput(data._id)}>{t('comment.action')}</div>
            <div className={cn(gap)}>
                {data.children.map((item, index) => 
                    (<CommentsItem  data={item} 
                                    key={index} 
                                    openInput={openInput} 
                                    openId={openId} 
                                    onInput={onInput} 
                                    onCancel={onCancel}
                                    sendComment={sendComment}
                                    inputValue={inputValue}
                                    exists={exists}
                                    i={1+i}
                    />))
                }
            </div>
            {openId === data._id? 
                (<><CommentsInput   onInput={onInput} 
                                    onCancel={onCancel} 
                                    sendComment={sendComment} 
                                    id={data._id} 
                                    inputValue={inputValue}
                                    exists={exists}/>
                </>): ''}
        </div>
    );
}

CommentsItem.propTypes = {
    data: PropTypes.object,
    i: PropTypes.number,
    waiting: PropTypes.bool, 
    openId: PropTypes.string, 
    inputValue: PropTypes.string, 
    exists: PropTypes.bool,
    onInput: PropTypes.func,
    openInput: PropTypes.func,
    onCancel: PropTypes.func,
    sendComment: PropTypes.func,
};

CommentsItem.defaultProps = {
    data: {},
    waiting: true,
    exists: false,
    onInput: () => {},
    openInput: () => {},
    onCancel: () => {},
    sendComment: () => {},
}

export default memo(CommentsItem);