import {Routes, Route} from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import LoginPage from "./login";
import ProfilePage from "./profile";
import {useEffect} from "react";
import useStore from "../hooks/use-store";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  const activeModal = useSelector(state => state.modals.name);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      store.actions.profile.profileLoad();
    }
  }, [store]);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/profile'} element={<ProfilePage />} />
        <Route path={'/login'} element={<LoginPage />} />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
