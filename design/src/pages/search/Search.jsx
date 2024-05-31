import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import SearchCom from "../../components/Inputs/search";
import { useQuery } from "react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const Search = () => {
  const { search: s } = useParams();
  const p = useSearchParams();
  const [sa, setSa] = React.useState("");
  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  const getBooks = useQuery("getbooks", () => {
    return axios.get("/books/search/" + s);
  });

  console.log(p);

  React.useEffect(() => {
    getBooks.refetch();
  }, [s]);

  if (getBooks.isLoading) {
    return <div>Loading...</div>;
  }

  if (getBooks.isError) {
    return <div>Error</div>;
  }

  let books = [];
  if (getBooks.data) {
    books = getBooks.data.data;
  }
  return (
    <div className="search-container">
      <div className="search-container__search">
        <SearchCom
          input={{ onInput: (e) => setSa(e.target.value), defaultValue: s }}
          button={{
            onClick: () => {
              if (sa.length > 0) {
                navigate("/search/" + sa);
              }
            },
          }}
        />
      </div>
      <div className="book-grid">
        {/* <h2 className="book-grid__title">search: {s}</h2> */}
        <div className="book-grid__container">
          {books?.map((book, index) => (
            <Link to={`/books/v/${book.id}`} className="book-grid__item" key={index}>
              <div key={book?.id}>
                <img
                  src={`${process.env.REACT_APP_API_URL}images/${book?.cover}`}
                  alt="Book Cover"
                  className="book-grid__image"
                />
                <div className="book-grid__content">
                  <h1 className="book-grid__title">{book.title?.slice(0, 20)}</h1>
                  <p className="book-grid__author">by: {book.username}</p>
                  <p className="book-grid__rate">
                    {book.avgRating ?? 0} <FontAwesomeIcon icon={faStar} />
                  </p>
                  <h3 className="book-grid__price">{book.price}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
