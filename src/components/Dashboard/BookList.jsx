
import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { isAdmin } from '../../utils/auth';
import BookForm from './BookForm';
import './BookList.css'

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const fetchBooks = async () => {
    try {
      const res = await api.get('books/');
      console.log('Books:', res.data);
      setBooks(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleDelete = async id => {
    if (window.confirm('Are you sure?')) {
      await api.delete(`books/${id}/`);
      fetchBooks();
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [books]);

  //  Filter logic
  const filteredBooks = books.filter(book => {
    const matchesSearch = (
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.genre.toLowerCase().includes(search.toLowerCase())
    );

    const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;
    const matchesAvailability = showAvailableOnly ? book.available : true;
    const isVisibleToUser = isAdmin() || true;

    return matchesSearch && matchesGenre && matchesAvailability && isVisibleToUser;
  });


  return (
    <div className=''>

    <div className="mt-4">
      <h4 style={{color:'white'}}>Books</h4>

      {/* Admin form */}
      {isAdmin() && (
        <BookForm fetchBooks={fetchBooks} editingBook={editingBook} setEditingBook={setEditingBook} />
      )}

      {/*  Search and filter */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"className="form-control"placeholder="Search by title, author, genre..."value={search} onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        
        <div className="col-md-3 form-check mt-2">
          <input
            type="checkbox"className="form-check-input me-2" id="availableOnly"checked={showAvailableOnly}onChange={(e) => setShowAvailableOnly(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="availableOnly">
            Available Only
          </label>
        </div>
      </div>

      {/* Book table */}
      <table className="table table-bordered table-striped mt-3">
        <thead>
          <tr>
            <th>Title</th><th>Author</th><th>Genre</th><th>Year</th><th>Available</th>
            {isAdmin() && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.published_year}</td>
              <td>{book.available ? 'Yes' : 'No'}</td>
              {isAdmin() && (
                <td>
                  <button onClick={() => setEditingBook(book)} className="btn btn-warning btn-sm me-2" > Edit </button>
                  <button onClick={() => handleDelete(book.id)} className="btn btn-danger btn-sm"> Delete </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>

  );
};

export default BookList;
