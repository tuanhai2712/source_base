import { useSelector } from "react-redux";
import { authSelector } from "@state/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routeConfig";
import Main from "./Main";
function App() {
  const { isAuthenticated } = useSelector(authSelector);
  return (
    <Main />
    // <BrowserRouter>
    //   <Routes>
    //     {publicRoutes.map((item, idx) => {
    //       return (
    //         <Route
    //           key={idx}
    //           path={item.path}
    //           exact={item.exact}
    //           component={item.component}
    //         />
    //       );
    //     })}

    //     {isAuthenticated && (
    //       <Main
    //         privateRoutes={privateRoutes}
    //         isAuthenticated={isAuthenticated}
    //       />
    //     )}
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
