import {memo, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css'

function ProductArticle(props) {

    const cn = bem('ProductArticle');

    const callbacks = {
        onAdd: (e) => props.onAdd(props.productInfo.id)
    }
    
    return(
        <div className={cn()}>
            <div className={cn('description')}>{props.productInfo.description}</div>
            <div className={cn('country')}>Страна производитель: <strong>{props.productInfo.madeIn}</strong></div>
            <div className={cn('category')}>Категория: <strong>{props.productInfo.category}</strong></div>
            <div className={cn('edition')}>Год выпуска: <strong>{props.productInfo.edition}</strong></div>
            <div className={cn('price')}><strong>Цена: {props.productInfo.price} ₽</strong></div>
            <button className={cn('action')} onClick={callbacks.onAdd}>Добавить</button>
        </div>
    )
}

ProductArticle.propTypes = {
    id: PropTypes.number.isRequired,
    description: PropTypes.string,
    madeIn: PropTypes.string,
    category: PropTypes.string,
    edition: PropTypes.number,
    price: PropTypes.number,
    onAdd: PropTypes.func
};

ProductArticle.defaultProps = {
    description: 'Описание не найдено',
    madeIn: 'Страна не найдена',
    category: 'Категория не найдена',
    edition: 0,
    price: 0,
    onAdd: () => {}
}

export default memo(ProductArticle);