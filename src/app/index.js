import React, {Suspense} from 'react';
import Main from './main';
import Basket from './basket';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import {Route, Routes} from "react-router-dom";

const Product = React.lazy(() => import('./product'));

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Suspense fallback={null}>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/product/:id' element={<Product />} />
        </Routes>
      </Suspense>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
