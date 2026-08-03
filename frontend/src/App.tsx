import { RouterProvider } from "react-router-dom";
import Router from "./router/router";
import { Providers } from './utils/provider'
import { ThemeProvider } from './components/theme-provider'

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Providers>
          <RouterProvider router={Router} />
        </Providers>
      </ThemeProvider>
    </>
  )
}

export default App
