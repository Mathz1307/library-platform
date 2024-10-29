import { useState } from 'react';
import { book, bookData } from '../App';
import Button from '../components/Button/Button';
import InputField from '../components/InputField/InputField';
import './AddBook.css';

const API_URL = import.meta.env.VITE_API_URL;

const addBook = async (bookData: bookData) => {
  console.log(bookData);
  try {
    const response = await fetch(`${API_URL}/library/api/books/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });
    if (!response.ok) {
      throw new Error('Failed to add book: ' + response.statusText);
    }

    const data: book = await response.json();
    return data;
  }
  catch (error) {
    console.error(error);
  }
}

const AddBook = () => {
  const [name, setName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [pages, setPages] = useState("");
  const [cover, setCover] = useState("");
  const [authors, setAuthors] = useState("");
  const [genres, setGenres] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !releaseDate || !pages || !cover || !authors || !genres) {
      setError("All fields are required");
      return;
    }

    const bookData: bookData = {
      name: name,
      release_date: releaseDate,
      pages: parseInt(pages),
      cover: cover,
      authors: authors.split(',').map(author => ({name: author})),
      genres: genres.split(',').map(genre => ({name: genre})),
    };

    addBook(bookData);
  }

  return (
      <div>
        <h1>Add new book</h1>
        <form className="book_form" onSubmit={handleSubmit}>
          <InputField type="text" name="name" text="Title: " placeholder="Amazing book title" value={name} onChange={(e) => setName(e.target.value)}/>
          <InputField type="date" name="release_date" text="Release date: " placeholder="YYYY-MM-DD" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)}/>
          <InputField type="number" name="pages" text="Pages: " placeholder="999" value={pages} onChange={(e) => setPages(e.target.value)}/>
          <InputField type="text" name="cover" text="Cover URL: " placeholder="Any valid image url works" value={cover} onChange={(e) => setCover(e.target.value)}/>
          <InputField type="" name="authors" text="Authors: " placeholder="John Doe,Jane Doe,... or John Doe" value={authors} onChange={(e) => setAuthors(e.target.value)}/>
          <InputField type="text" name="genres" text="Genres: " placeholder="Fantasy,Action,... or Fantasy" value={genres} onChange={(e) => setGenres(e.target.value)}/>
          {error && <p className="error_message">{error}</p>}
          <Button text="Add Book" type="submit" />
        </form>
      </div>
    );
  };
  
  export default AddBook;