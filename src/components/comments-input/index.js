import { memo } from 'react';
import PropTypes from 'prop-types';
import useTranslate from '../../hooks/use-translate';
import './style.css';
import { Link } from 'react-router-dom';

function CommentsInput({ onInput, onCancel, sendComment, id, inputValue, exists }) {

    const onInputValue = e => {
        onInput(e.target.value)
    }

    // Функция для локализации текстов
    const { t } = useTranslate();

    return (
        <div className='CommentsInput'>
            {exists ? (<>
                <span className='CommentsInput-title'>{t('commnet.input.title')}</span>
                <textarea className='CommentsInput-input' onChange={onInputValue} value={inputValue} />
                <div className='CommentsInput-action'>
                    <button className='action-item' onClick={() => sendComment(id)}>{t('commnet.input.send')}</button>
                    {onCancel ? (<button className='action-item' onClick={() => onCancel()}>{t('commnet.input.cancel')}</button>) : ''}
                </div></>
            ) : (
                <div className='CommentsInput-message'>
                    <Link to='/login' state={{ back: location.pathname }} className='message-link'>{t('comment.message.link')}</Link>
                    <span>{t('comment.message')}</span>
                </div>
            )}

        </div>
    );
}

CommentsInput.propTypes = {
    onInput: PropTypes.func, 
    onCancel: PropTypes.func, 
    sendComment: PropTypes.func, 
    id: PropTypes.string.isRequired, 
    inputValue: PropTypes.string, 
    exists: PropTypes.bool
};

CommentsInput.defaultProps = {
    onInput: () => {}, 
    sendComment: () => {}, 
    inputValue: "", 
    exists: false
}

export default memo(CommentsInput);