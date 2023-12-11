import {memo, useCallback, useEffect} from 'react';
import { redirect } from 'react-router-dom';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Basket() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    dictionary: state.dictionary
  }));

  useEffect(() => {
    store.actions.basket.updateBasket(store.actions.dictionary.getLangCode())
  }, []);

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store])
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} onRemove={callbacks.removeFromBasket}/>
    }, [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout  title={select.dictionary.basket.title} 
                  dictionary={select.dictionary.basket}
                  onClose={callbacks.closeModal}>
      <List dictionary={select.dictionary.basket.basketItem} 
            list={select.list} 
            renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} dictionary={select.dictionary.basket.basketTotal}/>
    </ModalLayout>
  );
}

export default memo(Basket);
