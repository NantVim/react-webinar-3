import React, { useCallback } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart"

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store]),

    onSwitchCart: useCallback(() => {
      store.switchCart();
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls cartValue={cart.value} 
                cartItemCount={cart.itemCount} 
                onAction={callbacks.onSwitchCart} />
      <List list={list} 
            onActionItem={callbacks.onAddItem} 
            actionTitle='Добавить'/>
      <Cart cart={cart} 
            onCloseCart={callbacks.onSwitchCart}
            onDeleteItem={callbacks.onDeleteItem}/>
    </PageLayout>
  );
}

export default App;
