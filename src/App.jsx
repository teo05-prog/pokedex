import { createHashRouter, RouterProvider } from 'react-router-dom';
import PokedexPage from './pages/PokedexPage';
import AboutPage from './pages/AboutPage';
import './App.css';

const router = createHashRouter([
  {
    path: '/',
    element: <PokedexPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;