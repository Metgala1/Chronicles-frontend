import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const routes = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />
  },
  {
    path: "Dashboard",
    element: <Dashboard />
  }
];

export default routes;
