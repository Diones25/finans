import { RouterProvider } from "react-router-dom";
import Router from "./router/router";
import BreadcrumbComponent from "./components/Breadcrumb";
import { Providers } from "./utils/provider";

function App() {
  return (
    <>
      <Providers>
        <BreadcrumbComponent />
          <RouterProvider router={Router} />
      </Providers>
    </>
  )
}

export default App;
