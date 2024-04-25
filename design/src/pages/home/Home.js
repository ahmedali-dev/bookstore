import React from 'react';
import homeimg from "./home.jpg"
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BookGrid from './Bookgrid';

const Home = () => {
  const categories = [
    'Mystery & Thriller / الرومانسية و المغامرة',
    'Poetry / الشعر',
    'Law / القانون',
    'Mystery & Thriller / الرومانسية و المغامرة',
    'Poetry / الشعر',
    'Law / القانون',
    'Mystery & Thriller / الرومانسية و المغامرة',
    'Poetry / الشعر',
    'Law / القانون',
    'Mystery & Thriller / الرومانسية و المغامرة',
    'Poetry / الشعر',
    'Law / القانون',
    'Mystery & Thriller / الرومانسية و المغامرة',
    'Poetry / الشعر',
    'Law / القانون',
  ];
  return (
    <div className='home'>
    <div className="library-home">
      <div className="library-home__header">
        <h1 className="library-home__title">Place Where Words Become Life</h1>
      </div>
      <div className="library-home__image-container">
        <div className="library-home__search-overlay">
          <div className="library-home__search">
            <input
              type="text"
              placeholder="Search"
              className="library-home__search-input"
            />
            <button className="library-home__search-button">
            <FontAwesomeIcon icon={faSearch}/>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="category-buttons">
        <h2 className="category-buttons__title">Categories</h2>
        <div className="category-buttons__grid">
        {categories.map((category, index) => (
          <button key={index} className="category-buttons__button">
            {category}
          </button>
        ))}
        </div>
    </div>
    <BookGrid/>
    </div>
  );
};

export default Home;