import {memo, useCallback, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ProductArticle from '../../components/product-article';
import ControlPanel from '../../components/control-panel';
import Navigation from '../../components/navigation';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Product() {

  const store = useStore();

  const {id} = useParams();

  useEffect(() => {
    store.actions.modals.close();
    store.actions.product.load(id, store.actions.dictionary.getLangCode());
  }, [id]);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    title: state.product.title,
    productInfo: {
      id: state.product.id,
      description: state.product.description,
      madeIn: state.product.madeIn,
      category: state.product.category,
      edition: state.product.edition,
      price: state.product.price
    },
    dictionary: state.dictionary
  }));
  
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(id => store.actions.basket.addToBasket(id, store.actions.dictionary.getLangCode()), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Изменение языка
    changeLang: useCallback(() => {
      store.actions.dictionary.changeLang(store.actions.dictionary.getLangCode());
      store.actions.product.load(id, store.actions.dictionary.getLangCode());
    })
  }

  return (
    <PageLayout>
      <Head title={select.title} 
            changeLang={callbacks.changeLang} 
            dictionary={select.dictionary.head} />
      <ControlPanel>
        <Navigation dictionary={select.dictionary.controlPanel.navigation}/>
        <BasketTool onOpen={callbacks.openModalBasket} 
                    amount={select.amount}
                    sum={select.sum}
                    dictionary={select.dictionary.controlPanel.basketTool}/>
      </ControlPanel>
      <ProductArticle productInfo={select.productInfo} 
                      onAdd={callbacks.addToBasket} 
                      dictionary={select.dictionary.product}/>
    </PageLayout>
  );
}

export default memo(Product);
