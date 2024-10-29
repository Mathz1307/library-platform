import './Book.css';
import reactLogo from '../../assets/react.svg';
import { book } from '../../App'; 
import { useState } from 'react';

function Book(book_info: book) {
    const [imgPath, setImgPath] = useState(book_info.cover);

    return (
        <div className="book">
            <img className="cover" src={imgPath} onError={() => setImgPath(reactLogo)}/>
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