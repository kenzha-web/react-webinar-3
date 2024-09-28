import React from 'react';
import Basket from './basket';
import useSelector from '../store/use-selector';
import AppRoutes from "../components/routes";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <AppRoutes />
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
