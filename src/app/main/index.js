import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ControlPanel from '../../components/control-panel';
import Navigation from '../../components/navigation';

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load(1, store.actions.dictionary.getLangCode());
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    pageCount: state.catalog.pageCount,
    selectedPage: state.catalog.selectedPage,
    dictionary: state.dictionary
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id, store.actions.dictionary.getLangCode()), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Загрузка страницы списка по номеру страницы
    changePage: useCallback(pageNumber => store.actions.catalog.load(pageNumber, store.actions.dictionary.getLangCode()), []),
    // Изменение языка
    changeLang: useCallback(() => {
      store.actions.dictionary.changeLang(store.actions.dictionary.getLangCode())
      store.actions.catalog.load(select.selectedPage, store.actions.dictionary.getLangCode())
    })
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title={select.dictionary.head.title} 
            changeLang={callbacks.changeLang}
            dictionary={select.dictionary.head} />
      <ControlPanel>
        <Navigation dictionary={select.dictionary.controlPanel.navigation}/>
        <BasketTool onOpen={callbacks.openModalBasket} 
                    amount={select.amount}
                    sum={select.sum}
                    dictionary={select.dictionary.controlPanel.basketTool}/>
      </ControlPanel>
      <List list={select.list} 
            renderItem={renders.item} 
            dictionary={select.dictionary.catalog}/>
      <Pagination pageCount={select.pageCount} 
                  selectedPage={select.selectedPage}
                  changePage={callbacks.changePage}/>
    </PageLayout>
  );
}

export default memo(Main);
