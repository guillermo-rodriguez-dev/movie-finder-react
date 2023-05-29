import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
