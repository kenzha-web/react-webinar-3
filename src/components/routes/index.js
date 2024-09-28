import {Route, Routes} from "react-router-dom";
import Main from "../../app/main";
import React, {Suspense} from "react";
import {ROUTES} from "../utils/routes";

const Product = React.lazy(() => import('../../app/product'));

function AppRoutes(props) {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path={ROUTES.MAIN} element={<Main />} />
        <Route path={ROUTES.PRODUCT} element={<Product />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes;
