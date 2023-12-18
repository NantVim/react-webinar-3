import {useCallback, useContext, useEffect, useState} from 'react';
import useStore from "../hooks/use-store";
import useInit from "../hooks/use-init";
import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Auth from './auth';
import Profile from './profile';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const store = useStore();

  const activeModal = useSelector(state => state.modals.name);

  useInit(() => {
    store.actions.profile.authCheck();
  }, [store], true);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Auth/>}/>
        <Route path={'/profile'} element={<Profile/>} />
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
