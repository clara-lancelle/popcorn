import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import FavPage from './Components/Dom/FavPage';
import HomePage from './Components/Dom/HomePage';
import Navbar from './Components/Dom/Navbar';

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
