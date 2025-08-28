import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const routes = [
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: "register",
    element: <Register />
  },
  {
    path: "login",
    element: <Login />
  }
];

export default routes;
