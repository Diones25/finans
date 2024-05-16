import { RouterProvider } from "react-router-dom";
import Router from "./router/router";
import BreadcrumbComponent from "./components/Breadcrumb";

function App() {
  return (
    <>
      <BreadcrumbComponent />
      <RouterProvider router={Router} />
    </>
  )
}

export default App;
