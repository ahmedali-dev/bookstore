import React from 'react';
import booki from "./book.jpg"
const BookGrid = () => {
  const books = [
    {
      title: 'hacking the system design interview',
      author: 'Stanley Ching',
      price: '$40',
    },
    {
      title: 'hacking the system design interview',
      author: 'Stanley Ching',
      price: '$40',
    },
    {
      title: 'hacking the system design interview',
      author: 'Stanley Ching',
      price: '$40',
    },
    {
      title: 'hacking the system design interview',
      author: 'Stanley Ching',
      price: '$40',
    },
    {
      title: 'hacking the system design interview',
      author: 'Stanley Ching',
      price: '$40',
    },
    {
      title: 'hacking the system design interview',
      author: 'Stanley Ching',
      price: '$40',
    },
    {
      title: 'hacking the system design interview',
      author: 'Stanley Ching',
      price: '$40',
    },
    {
      title: 'hacking the system design interview',
      author: 'Stanley Ching',
      price: '$40',
    },
    {
      title: 'hacking the system design interview',
      author: 'Stanley Ching',
      price: '$40',
    },
    {
      title: 'hacking the system design interview',
      author: 'Stanley Ching',
      price: '$40',
    },
  ];

  return (
    <div className="book-grid">
      <h2 className="book-grid__title">Top Books</h2>
      <div className="book-grid__container">
        {books.map((book, index) => (
          <div key={index} className="book-grid__item">
            <img src={booki} alt="Book Cover" className="book-grid__image" />
            <div className="book-grid__content">
              <h3 className="book-grid__title">{book.title}</h3>
              <p className="book-grid__author">{book.author}</p>
              <p className="book-grid__price">{book.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookGrid;