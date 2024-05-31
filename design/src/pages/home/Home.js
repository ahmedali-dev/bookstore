import React from "react";
import homeimg from "./home.jpg";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BookGrid from "./Bookgrid";
import { Link, useNavigate } from "react-router-dom";
import useGetCategorys from "../../hooks/useGetCategorys";
import { setError } from "../../Error/ErrorSlice";
import { useDispatch } from "react-redux";
const Home = () => {
  const getCategorys = useGetCategorys();
  const [search, setSearch] = React.useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  if (getCategorys.isError) {
    dispatch(setError(getCategorys?.error?.response));
  }
  let categories = [];
  if (getCategorys?.data) {
    console.log(getCategorys?.data?.data?.category?.map((category) => category.name));
    categories = getCategorys?.data?.data?.category;
  }
  return (
    <div className="home">
      <div className="library-home">
        <div className="library-home__header">
          <h1 className="library-home__title">Place Where</h1>
          <h1 className="library-home__title">Words Become Life</h1>
        </div>
        <div className="library-home__image-container">
          <div className="library-home__search-overlay">
            <div className="library-home__search">
              <input
                onInput={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search"
                className="library-home__search-input"
              />
              <button
                onClick={() => {
                  if (search.length > 0) {
                    navigate(`/search/${search}`);
                  }
                }}
                className="library-home__search-button"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="category-buttons">
        <h2 className="category-buttons__title">Categories</h2>
        <div className="category-buttons__grid">
          {categories?.map((category, index) => (
            <Link key={index.id} className="category-buttons__button">
              {category.name}
            </Link>
          ))}
        </div>
      </div>
      <BookGrid />
    </div>
  );
};

export default Home;
