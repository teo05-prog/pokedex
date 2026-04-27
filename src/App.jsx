import { createHashRouter, RouterProvider } from 'react-router-dom';
import PokedexPage from './pages/PokedexPage';
import PokemonDetail from './pages/PokemonDetail';
import AboutPage from './pages/AboutPage';
import './App.css';

const router = createHashRouter([
  {
    path: '/',
    element: <PokedexPage />,
  },
  {
    path: '/pokemon/:name',
    element: <PokemonDetail />,
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
