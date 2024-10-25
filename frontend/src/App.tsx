import { useEffect, useState } from 'react'
import './App.css'
import Book from './components/Book/Book'

const API_URL = import.meta.env.VITE_API_URL;

type author = {
  id: number;
  name: string;
}

type genre = {
  id: number;
  name: string;
}

type book = {
  id: number;
  name: string;
  release_date: string;
  pages: number;
  cover: string;
  authors: author[];
  genres: genre[];
}

function App() {
  const [books, setBooks] = useState<book[]>([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try { 
      const response = await fetch(`${API_URL}/library/api/books`);
      const data: book[] = await response.json();
      console.log(data); 
      setBooks(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <h1>Books</h1>
      <div className="books">
        {books.map(book => (
          <Book key={book.id} {...book} />
        ))}
      </div>
    </div>
  );
}

export default App
