import { useEffect, useState } from 'react'
import './Home.css'
import Book from '../components/Book/Book'
import Button from '../components/Button/Button';
import { book } from '../App';

const API_URL = import.meta.env.VITE_API_URL;

function Home() {
  const [books, setBooks] = useState<book[]>([]);
  const [manageMode, setManageMode] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try { 
      const response = await fetch(`${API_URL}/library/api/books`);
      const data: book[] = await response.json();
      
      setBooks(data);
    } 
    catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <h1>Books</h1>
      <div className="buttons">
        {manageMode ?
        <Button text="Done" onClickFunction={() => setManageMode(!manageMode)} />
        :
        <Button text="Manage books" onClickFunction={() => setManageMode(!manageMode)} />
        }
      </div>
      <div className="books">
        {books.map(book => (
          <Book key={book.id} book_info={book} manageMode={manageMode} />
        ))}
      </div>
    </div>
  );
}

export default Home
