import AddBalance from '@/components/AddBalance';
import AddCategory from '@/components/AddCategory';
import AddConstruction from '@/components/AddConstruction';
import AddSpent from '@/components/AddSpent';
import AppLayout from '@/components/AppLayout';
import Construction from '@/components/Construction';
import EditCategory from '@/components/EditCategory';
import EditConstruction from '@/components/EditConstruction';
import EditSpent from '@/components/EditSpent';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Register from '@/components/Register';
import RequireAuth from '@/components/RequireAuth';
import PublicOnly from '@/components/PublicOnly';
import { createBrowserRouter } from 'react-router-dom';

export const Router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      {
        index: true,
        Component() {
          return (
            <RequireAuth>
              <Home />
            </RequireAuth>
          )
        }
      },
      {
        path: 'login',
        Component() {
          return (
            <PublicOnly>
              <Login />
            </PublicOnly>
          )
        }
      },
      {
        path: 'register',
        Component() {
          return (
            <PublicOnly>
              <Register />
            </PublicOnly>
          )
        }
      },
      {
        path: 'construction',
        Component() {
          return (
            <RequireAuth>
              <Construction />
            </RequireAuth>
          )
        }
      },
      {
        path: 'add/spent',
        Component() {
          return (
            <RequireAuth>
              <AddSpent />
            </RequireAuth>
          )
        }
      },
      {
        path: 'edit/spent/:id',
        Component() {
          return (
            <RequireAuth>
              <EditSpent />
            </RequireAuth>
          )
        }
      },
      {
        path: 'add/category',
        Component() {
          return (
            <RequireAuth>
              <AddCategory />
            </RequireAuth>
          )
        }
      },
      {
        path: 'edit/category/:id',
        Component() {
          return (
            <RequireAuth>
              <EditCategory />
            </RequireAuth>
          )
        }
      },
      {
        path: 'add/balance/:id',
        Component() {
          return (
            <RequireAuth>
              <AddBalance />
            </RequireAuth>
          )
        }
      },
      {
        path: 'add/construction',
        Component() {
          return (
            <RequireAuth>
              <AddConstruction />
            </RequireAuth>
          )
        }
      },
      {
        path: 'construction/edit/:id',
        Component() {
          return (
            <RequireAuth>
              <EditConstruction />
            </RequireAuth>
          )
        }
      }
    ]
  }
]);

export default Router;
