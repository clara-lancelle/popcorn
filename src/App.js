import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import FavPage from './Components/layouts/FavPage';
import HomePage from './Components/layouts/HomePage';
import Navbar from './Components/layouts/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fav" element={<FavPage />} />
      </Routes>
    </div >
  );
}

export default App;
