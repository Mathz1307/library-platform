import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';  // Assuming you have a Home component
import AddBook from './pages/AddBook'; // The new About page component
import Navbar from './components/Navbar/Navbar';
import './App.css';

type author = {
  id: number;
  name: string;
}

type genre = {
  id: number;
  name: string;
}

export type book = {
  id: number;
  name: string;
  release_date: string;
  pages: number;
  cover: string;
  authors: author[];
  genres: genre[];
}

export type bookData = {
  name: string;
  release_date: string;
  pages: number;
  cover: string;
  authors: object[];
  genres: object[];
}

function App() {
  return (
    <>
    <div className="navbar">
      <Navbar/>
    </div>
    <div className="page">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-book" element={<AddBook />} />
      </Routes>
    </div>
    </>
  );
}

export default App;