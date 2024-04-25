import { faAdd, faCartShopping, faEdit, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./../../components/Buttons/Button";
import useAxiosPrivate from "./../../hooks/useAxiosPrivate";
import React, { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../hooks/useAuth";

const ViewBook = () => {
  const axios = useAxiosPrivate();
  const { id } = useParams();
  const [rv, setReview] = React.useState("");
  const [star, setStar] = React.useState(0);
  const auth = useAuth();
  const decoded = jwtDecode(auth.token);
  const navigate = useNavigate();
  const query = useQuery("edit", () => {
    return axios.get(`books/${id}`);
  });

  const reviewsQuery = useQuery("reviews", () => {
    return axios.get("/reviews/" + id);
  });

  const cartquery = useQuery("cartbyid", () => {
    return axios.get("/cart/by/" + id);
  });

  const AddCartMutation = useMutation("cart/add", (data) => {
    return axios.post("/cart", { ...data, count: 1 });
  });

  const deleteCartMutation = useMutation("cart/add", (data) => {
    return axios.delete("/cart/delete/" + data);
  });

  const reviewMutaion = useMutation("review/create", (data) => {
    return axios.post("/reviews", data);
  });

  useEffect(() => {
    if (reviewMutaion.isSuccess) {
      reviewsQuery.refetch();
    }
  }, [reviewMutaion.data, reviewMutaion.isError, reviewMutaion.isSuccess]);
  let bookData = [];
  if (bookData) {
    bookData = query?.data?.data[0];
  }

  let reviewsData = [];
  if (reviewsData) {
    reviewsData = reviewsQuery?.data?.data;
  }

  let cartdata = [];
  if (cartdata) {
    cartdata = cartquery?.data?.data[0];
  }

  console.log(cartdata?.found);
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

          {decoded?.id === bookData?.user_id ? (
            <Button
              onClick={() => {
                navigate(`/books/edit/${bookData?.id}`);
              }}
            >
              <FontAwesomeIcon icon={faEdit} />
              <span> edit</span>
            </Button>
          ) : cartdata?.found ? (
            <Button
              onClick={() => {
                deleteCartMutation.mutate(bookData?.id);
              }}
              loading={cartquery.isLoading}
              className="error"
            >
              <FontAwesomeIcon icon={faTrash} />
              <span> delete from cart</span>
            </Button>
          ) : (
            <Button
              loading={cartquery.isLoading}
              onClick={() => {
                AddCartMutation.mutate({ book_id: bookData?.id });
              }}
            >
              <FontAwesomeIcon icon={faCartShopping} />
              <span> Add to cart</span>
            </Button>
          )}
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
            onChange={(e) => {
              setReview(e.currentTarget.value);
            }}
          ></textarea>
          <div className="star">
            <Button onClick={(e) => setStar(e.target.innerText)}>1</Button>
            <Button onClick={(e) => setStar(e.target.innerText)}>2</Button>
            <Button onClick={(e) => setStar(e.target.innerText)}>3</Button>
            <Button onClick={(e) => setStar(e.target.innerText)}>4</Button>
            <Button onClick={(e) => setStar(e.target.innerText)}>5</Button>
            <p>
              <span>{star}</span>
              <FontAwesomeIcon icon={faStar} />
            </p>
          </div>
          {/*  onClick={() => reviewMutaion.mutate({ review: rv, book_id: id })} */}
          <Button
            onClick={() => {
              if (rv.length > 0 && id) {
                reviewMutaion.mutate({ review: rv, book_id: id, rating: star });
              }
            }}
          >
            <FontAwesomeIcon icon={faAdd} />
            <span> add review</span>
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
