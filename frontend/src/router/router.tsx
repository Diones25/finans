import AddCategory from '@/components/AddCategory';
import AddSpent from '@/components/AddSpent';
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
  },
  {
    path: '/add/spent',
    Component() {
      return (
        <AddSpent />
      )
    }
  },
  {
    path: '/add/category',
    Component() {
      return (
        <AddCategory />
      )
    }
  }
]);

export default Router;