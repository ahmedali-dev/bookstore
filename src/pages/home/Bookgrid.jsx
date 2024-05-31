import React, { useEffect } from 'react';
import booki from "./book.jpg"
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useDispatch } from 'react-redux';
import { setError } from '../../Error/ErrorSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
const BookGrid = () => {
  const axios = useAxiosPrivate();
  const dispatch = useDispatch();
  const {data, isError, isLoading, error} = useQuery('getbook', ()=>{
    return axios.get('/books/top/rate');
  })


  useEffect(()=>{
    if(isError){
      dispatch(setError(error.response))
    }
  },[isError]);

  

  if(isLoading){
    return <div>Loading...</div>
  }

  let books = [];
  if(data){
    books = data?.data;
  }
  console.log(books)

  return (
    <div className="book-grid">
      <h2 className="book-grid__title">Top Books</h2>
      <div className="book-grid__container">
        {books?.map((book, index) => (
          <Link to={`/books/v/${book.id}`} className="book-grid__item" key={index}>
            <div key={book?.id} >
            <img src={`${process.env.REACT_APP_API_URL}images/${book?.cover}`} alt="Book Cover" className="book-grid__image" />
            <div className="book-grid__content">
              <h1 className="book-grid__title">{book.title?.slice(0, 20)}</h1>
              <p className="book-grid__author">by: {book.username}</p>
              <p className="book-grid__rate">{book.avgRating ?? 0} <FontAwesomeIcon icon={faStar} /></p>
              <h3 className="book-grid__price">{book.price}</h3>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookGrid;