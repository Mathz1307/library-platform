import { useEffect, useState } from 'react'
import './Home.css'
import Book from '../components/Book/Book'
import Button from '../components/Button/Button';
import { book } from '../App';

const API_URL = import.meta.env.VITE_API_URL;

function Home() {
  const [books, setBooks] = useState<book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<book[]>([]);
  const [manageMode, setManageMode] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(0);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredBooks(books);
      return;
    }

    switch (filter) {
      case 0:
        setFilteredBooks(books.filter(book => book.name.toLowerCase().includes(search.toLowerCase())));
        break;
      case 1:
        setFilteredBooks(books.filter(book => book.authors.map(author => author.name.toLowerCase()).join().includes(search.toLowerCase())));
        break;
      case 2:
        setFilteredBooks(books.filter(book => book.genres.map(genre => genre.name.toLowerCase()).join().includes(search.toLowerCase())));
        break;
      default:
        setFilteredBooks(books);
        break;
    }
    
  }, [search, books]);

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
      <div className="search">
        <input type="text" placeholder="Search books" onChange={(e) => setSearch(e.target.value)}/>
        <select onChange={(e) => setFilter(parseInt(e.target.value))}>
          <option value="0">Title</option>
          <option value="1">Author</option>
          <option value="2">Genre</option>
        </select>
      </div>
      <div className="books">
        {filteredBooks.map(book => (
          <Book key={book.id} book_info={book} manageMode={manageMode} />
        ))}
      </div>
    </div>
  );
}

export default Home
