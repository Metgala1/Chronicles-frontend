import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PostPage from './components/PostPage';
import LoadingDots from './components/loadings/LoadingDot';
import Error from './components/ErrorComponent/Error';
import CreatePost from './components/CreatePost';
import PublicRoute from './components/PublicRoute';

const routes = [
  {
    path: '/',
    element: <Dashboard />,
    errorElement: <Error />,
  },
  {
    path: 'register',
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
    errorElement: <Error />, 
  },
  {
    path: 'login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
    errorElement: <Error />,
  },
  {
    path: 'posts/:id',
    element: <PostPage />,
    errorElement: <Error />,
  },
  {
    path: 'loading',
    element: <LoadingDots />,
    errorElement: <Error />,
  },
  {
    path: "createpost",
    element: <CreatePost />,
    errorElement: <Error />
  }
];

export default routes;
