import { useNavigate, useParams,Link } from "react-router-dom";
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import useGetBookByCategory from '../../hooks/useGetBooksByCategory';
import { useDispatch } from 'react-redux';
import { setError } from '../../Error/ErrorSlice';
import Loading from '../../components/loading/Loading';
const Categorys = ({ ...props }) => {
    const { id } = useParams();
    const getBook = useGetBookByCategory(id);
    const dispatch = useDispatch();

    useEffect(()=>{
        getBook.mutate()
    }, [id])

    if (getBook?.isError) {
        dispatch(setError(getBook?.error?.response));
    }

    if (getBook?.isLoading) {
        return <div><Loading width={'4rem'} height={'4rem'} /></div>;
    }

    let books = [];
    if (getBook?.data) {
        books = getBook?.data?.data[0];
    }

    

    return <>
    <div className="home">
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
    </div>
    </>
}

export default Categorys;