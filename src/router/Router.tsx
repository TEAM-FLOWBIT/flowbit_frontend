import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/login/Login';
import SignUp from '../pages/signUp/signUp';
import Community from '../pages/community/Community';
import Root from '../pages/Root';
import News from '../pages/news/News';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'signUp', element: <SignUp /> },
      { path: 'community', element: <Community /> },
      { path: 'news', element: <News /> },
    ],
  },
]);

export default router;
