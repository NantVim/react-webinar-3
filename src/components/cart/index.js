import React from "react";
import PropTypes from 'prop-types';
import './style.css';

import Head from '../head';
import List from '../list';

function Cart({ cart, onCloseCart, onDeleteItem }) {
    return (
        <>
            {cart.isOpen && (
                <div className='Cart'>
                    <div className='Cart-layout'>
                        <Head title={'Корзина'}>
                            <button onClick={onCloseCart}>Закрыть</button>
                        </Head>
                        <div className='Cart-content'>
                            <List list={cart.items} onActionItem={onDeleteItem} actionTitle='Удалить' />
                            <div className='Cart-info'>
                                <strong className='Info-title'>Итого</strong>
                                <strong className='Info-data'>{cart.value} ₽</strong>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}

Cart.PropTypes = {
    cart: {
        items: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            code: PropTypes.number,
            price: PropTypes.number,
            count: PropTypes.number
        })),
        itemCount: PropTypes.number,
        value: PropTypes.number,
        isOpen: PropTypes.bool
    }.isRequired,
    onCloseCart: PropTypes.func,
    onDeleteItem: PropTypes.func
}

Cart.defaultProps = {
    onCloseCart: () => {},
    onDeleteItem: () => {}
}

export default React.memo(Cart);
