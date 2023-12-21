import { memo, useCallback, useMemo } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import { useDispatch } from 'react-redux';
import modalsActions from '../../store-redux/modals/actions';
import SideLayout from '../../components/side-layout';
import CommentsItem from '../../components/comments-item';
import listToTree from '../../utils/list-to-tree'

function Comments({count, items, waiting}) {
    const callbacks = {
    }

    // Функция для локализации текстов
    const { t } = useTranslate();

    return (
        <SideLayout padding='big'>
            {waiting ? ('waiting'): ''}
            <div className='Comments'>
                <h2>Коментаррии {`(${count})`}</h2>
                {items.map((item, index) => (<CommentsItem data={item} key={index}/>))}
            </div>
        </SideLayout>
    );
}

export default memo(Comments);
