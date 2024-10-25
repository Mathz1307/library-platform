import './Book.css';

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

const cover_path = API_URL;  

function Book(book_info: book) {
    const image_path = `${cover_path}${book_info.cover}`;
    return (
        <div className="book">
            <img className="cover" src={image_path} alt={image_path}/>
            <h2 className="title">{book_info.name}</h2>
            <div className="info">
                <p>{`Release date: ${book_info.release_date}`}</p>
                <p>{`${book_info.pages} pages`}</p>
                <h3>Authors:</h3>
                {book_info.authors.map(author => (
                    <p key={author.id}>{author.name}</p>
                ))}
                <h3>Genres:</h3>
                {book_info.genres.map(genre => (
                    <p key={genre.id}>{genre.name}</p>
                ))}
            </div>
        </div>
    );
}

export default Book;