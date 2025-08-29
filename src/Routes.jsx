import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PostPage from './components/PostPage';
import LoadingDots from './components/loadings/LoadingDot';
import Error from './components/ErrorComponent/Error';

const routes = [
  {
    path: '/',
    element: <Dashboard />,
    errorElement: <Error />,
  },
  {
    path: 'register',
    element: <Register />,
    errorElement: <Error />, 
  },
  {
    path: 'login',
    element: <Login />,
    errorElement: <Error/>,
  },
  {
    path: 'posts/:id',
    element: <PostPage />,
    errorElement: <Error/>,
  },
  {
    path: 'loading',
    element: <LoadingDots />,
    errorElement: <Error />,
  },
];

export default routes;
