import { memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import { useDispatch } from 'react-redux';
import commentsActions from '../../store-redux/comments/actions';
import modalsActions from '../../store-redux/modals/actions';
import CommentsLayout from '../../components/comments-layout';
import CommentsItem from '../../components/comments-item';
import listToTree from '../../utils/list-to-tree'
import CommentsInput from '../../components/comments-input';

function Comments({ count, items, waiting, openId, inputValue, exists }) {
    const dispatch = useDispatch();
    const params = useParams();
    
    const callbacks = {
        onInput: useCallback(value => dispatch(commentsActions.inputComment(value))),
        openInput: useCallback(id => dispatch(commentsActions.openCommentInput(id))),
        onCancel: useCallback(() => dispatch(commentsActions.openCommentInput(params.id))),
        sendComment: useCallback(id => {
            dispatch(commentsActions.sendComment(id, 'comment'))
            dispatch(commentsActions.load(params.id))
        }),
        sendCommentArticle: useCallback(id => {
            dispatch(commentsActions.sendComment(id, 'article'))
            dispatch(commentsActions.load(params.id))
        }),
    }

    // Функция для локализации текстов
    const { t } = useTranslate();

    return (
        <CommentsLayout>
            {waiting ? ('waiting') : ''}
            <div className='Comments'>
                <h2>{`${t('comments.title')} (${count})`}</h2>
                {items.map((item, index) =>
                (<CommentsItem data={item}
                    key={index}
                    onInput={callbacks.onInput}
                    openInput={callbacks.openInput}
                    openId={openId}
                    onCancel={callbacks.onCancel}
                    sendComment={callbacks.sendComment}
                    inputValue={inputValue}
                    exists={exists}
                    i={1}
                />))
                }
                {openId === params.id ?
                    (<><CommentsInput onInput={callbacks.onInput}
                        sendComment={callbacks.sendCommentArticle}
                        id={params.id}
                        inputValue={inputValue}
                        exists={exists} />
                    </>) : ''}
            </div>

        </CommentsLayout>
    );
}

Comments.propTypes = {
    count: PropTypes.number, 
    items: PropTypes.array, 
    waiting: PropTypes.bool, 
    openId: PropTypes.string, 
    inputValue: PropTypes.string, 
    exists: PropTypes.bool
};

Comments.defaultProps = {
    count: 0,
    items: [],
    waiting: true,
    exists: false
}

export default memo(Comments);
