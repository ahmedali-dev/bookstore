import { faAdd, faCartShopping, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Buttons/Button";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";

const ViewBook = () => {
  const axios = useAxiosPrivate();
  const { id } = useParams();
  const query = useQuery("edit", () => {
    return axios.get(`books/${id}`);
  });

  const reviewsQuery = useQuery("reviews", () => {
    return axios.get("/reviews/" + id);
  });

  let bookData = [];
  if (bookData) {
    bookData = query?.data?.data[0];
  }

  let reviewsData = [];
  if (reviewsData) {
    reviewsData = reviewsQuery?.data?.data;
  }

  console.log(bookData);
  return (
    <div className="view-book" key={bookData?.id}>
      <div className="header">
        <div className="cover">
          <img
            src={`${process.env.REACT_APP_API_URL}images/${bookData?.cover}`}
            alt={bookData?.title}
          />
        </div>

        {/* book info */}
        <div className="info">
          <h1>{bookData?.title}</h1>
          <p>Seller: {bookData?.username}</p>
          <p>
            Rating: {bookData?.rating} <FontAwesomeIcon icon={faStar} />
          </p>
          <p>Category: {bookData?.cateName}</p>
          <p>Count: {bookData?.count}</p>
          <h2>Price: {bookData?.price}</h2>
          <p>Description: {bookData?.description?.slice(1, 400)}</p>

          <Button>
            <FontAwesomeIcon icon={faCartShopping} />
            <span>Add to cart</span>
          </Button>
        </div>
      </div>

      <div className="description">
        <h1 className="tt">Description</h1>
        <MarkdownPreview
          className="markdown"
          wrapperElement={{
            "data-color-mode": "light",
          }}
          source={bookData?.description}
        >
          {bookData?.description}
        </MarkdownPreview>
      </div>

      {/* reviews */}
      <div className="reviews">
        <h1 className="tt">Reviews</h1>
        <div className="addReview">
          <h2>Add Review</h2>

          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Write your review here..."
          ></textarea>
          <Button>
            <FontAwesomeIcon icon={faAdd} />
          </Button>
        </div>

        <div className="reviewsList">
          {reviewsQuery.isLoading ? (
            <div>Loading...</div>
          ) : (
            reviewsData?.map((review) => {
              return (
                <div className="review">
                  <div className="reviewHeader">
                    <img
                      src={`${process.env.REACT_APP_API_URL}images/${review?.avatar}`}
                      alt={"user avatar"}
                    />
                    <div className="reviewInfo">
                      <h3>{review?.username}</h3>
                      <p>
                        Rating: {review?.rating} <FontAwesomeIcon icon={faStar} />
                      </p>
                    </div>
                  </div>
                  <div className="reviewContent">
                    <MarkdownPreview
                      wrapperElement={{
                        "data-color-mode": "light",
                      }}
                      className="markdown"
                      source={review?.review}
                    ></MarkdownPreview>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
