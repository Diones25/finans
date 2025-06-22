import { RouterProvider } from "react-router-dom";
import Router from "./router/router";
import BreadcrumbComponent from './components/Breadcrumb'
import { Providers } from './utils/provider'
import { ThemeProvider } from './components/theme-provider'

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Providers>
          <BreadcrumbComponent />
          <RouterProvider router={Router} />
        </Providers>
      </ThemeProvider>
    </>
  )
}

export default App
