import './Book.css';
import notFound from '../../assets/aware.png';
import { book } from '../../App'; 
import { useState } from 'react';
import Button from '../Button/Button';

type BookProps = {
    book_info: book;
    manageMode: boolean;
}

const API_URL = import.meta.env.VITE_API_URL;

function Book({ book_info, manageMode }: BookProps) {
    const [imgPath, setImgPath] = useState(book_info.cover);
    const [notDeleted, setNotDeleted] = useState(true);

    const deleteBook = async (book_id: number) => {
        try {
            const response = await fetch(`${API_URL}/library/api/books/delete/${book_id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            console.log(data);
    
            if (response.ok) {
                setNotDeleted(false);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    return notDeleted && (
        <div className="book">
            <div className="buttons">
                {manageMode && <Button text="Delete" onClickFunction={() => deleteBook(book_info.id)} />}
            </div>
            <img className="cover" src={imgPath} onError={() => setImgPath(notFound)}/>
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