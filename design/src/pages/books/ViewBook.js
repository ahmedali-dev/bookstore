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

  let bookData = [];
  if (bookData) {
    bookData = query?.data?.data[0];
    let h = [
      {
        id: "585ce696-fecd-467e-9d50-1076d3cab89b",
        user_id: "adca7ea9-0624-4eb6-802d-08c84e3c4eac",
        category_id: "aab3238922bcc25a6f606eb525ffdc56",
        cover: "1713932517368-cae5b88f-277d-4567-afe3-ce0a93897b73.jpg",
        title: "System Design Interview – An insider's guide",
        description:
          "System Design Interview - An Insider's Guide (Volume 1)\r\n\r\nSystem design interviews are the most difficult to tackle of all technical interview questions. This book is Volume 1 of the System Design Interview - An insider’s guide series that provides a reliable strategy and knowledge base for approaching a broad range of system design questions. This book provides a step-by-step framework for how to tackle a system design question. It includes many real-world examples to illustrate the systematic approach, with detailed steps that you can follow.\r\n\r\nWhat’s inside?\r\n- An insider’s take on what interviewers really look for and why.\r\n- A 4-step framework for solving any system design interview question.\r\n- 16 real system design interview questions with detailed solutions.\r\n- 188 diagrams to visually explain how different systems work.\r\n\r\nTable Of Contents\r\nChapter 1: Scale From Zero To Millions Of Users\r\nChapter 2: Back-of-the-envelope Estimation\r\nChapter 3: A Framework For System Design Interviews\r\nChapter 4: Design A Rate Limiter\r\nChapter 5: Design Consistent Hashing\r\nChapter 6: Design A Key-value Store\r\nChapter 7: Design A Unique Id Generator In Distributed Systems\r\nChapter 8: Design A Url Shortener\r\nChapter 9: Design A Web Crawler\r\nChapter 10: Design A Notification System\r\nChapter 11: Design A News Feed System\r\nChapter 12: Design A Chat System\r\nChapter 13: Design A Search Autocomplete System\r\nChapter 14: Design Youtube\r\nChapter 15: Design Google Drive\r\nChapter 16: The Learning Continues",
        price: "37.99",
        count: 2,
        rating: "0.0",
        created: "2024-04-24T04:21:57.000Z",
        updated: "2024-04-24T04:22:25.000Z",
        username: "Yuuuumi",
        cateName: "Science & Technology / العلوم وا",
      },
    ];
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
          <div className="review">
            <div className="reviewHeader">
              <img
                src={`${process.env.REACT_APP_API_URL}images/${bookData?.cover}`}
                alt={bookData?.title}
              />
              <div className="reviewInfo">
                <h3>{bookData?.username}</h3>
                <p>
                  Rating: {bookData?.rating} <FontAwesomeIcon icon={faStar} />
                </p>
              </div>
            </div>
            <div className="reviewContent">
              <MarkdownPreview
                wrapperElement={{
                  "data-color-mode": "light",
                }}
                className="markdown"
                source={bookData?.description}
              ></MarkdownPreview>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
