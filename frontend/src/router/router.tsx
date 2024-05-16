import Construction from '@/components/Construction';
import Home from '@/components/Home';
import { createBrowserRouter } from 'react-router-dom';

export const Router = createBrowserRouter([
  {
    path: '/',
    Component() {
      return (
        <Home />
      )
    }
  },
  {
    path: '/construction',
    Component() {
      return (
        <Construction />
      )
    }
  }
]);

export default Router;