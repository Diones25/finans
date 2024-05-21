import AddBalance from '@/components/AddBalance';
import AddCategory from '@/components/AddCategory';
import AddConstruction from '@/components/AddConstruction';
import AddSpent from '@/components/AddSpent';
import Construction from '@/components/Construction';
import EditCategory from '@/components/EditCategory';
import EditConstruction from '@/components/EditConstruction';
import EditSpent from '@/components/EditSpent';
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
    path: '/edit/spent/:id',
    Component() {
      return (
        <EditSpent />
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
  },  
  {
    path: '/edit/category/:id',
    Component() {
      return (
        <EditCategory />
      )
    }
  },
  {
    path: '/add/balance/:id',
    Component() {
      return (
        <AddBalance />
      )
    }
  },
  {
    path: '/add/construction',
    Component() {
      return (
        <AddConstruction />
      )
    }
  },
  {
    path: `/construction/edit/:id`,
    Component() {
      return (
        <EditConstruction />
      )
    }
  }
]);

export default Router;