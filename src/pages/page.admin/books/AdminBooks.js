import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminBooksState, AllAdminBooks, filterByDate, getBooks, searchInBooks } from "./AdminBooksSlice";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Search from "../../../components/Inputs/search";
import Tables from "../../../components/table/Table";
import { Link, Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import EditBook from "./EditBook";
import Button from "../../../components/Buttons/Button";
import Filter from "../../../components/filter/Filter";
import { toast } from "react-toastify";
import { setError } from "../../../Error/ErrorSlice";

const AdminBooks = () => {
  const booksUtil = useSelector(AdminBooksState);
  const books = useSelector(AllAdminBooks);
  const dispatch = useDispatch();
  const axios = useAxiosPrivate();
  const [search, setSearch] = React.useState("");
  const [start,setStart]=React.useState("");
  const [end, setEnd] = React.useState("")

  React.useEffect(() => {
    dispatch(getBooks({ fetch: axios }));
  }, []);

  React.useEffect(()=>{
    if(booksUtil.isError){
      dispatch(setError(booksUtil.error))
    }
  }, [booksUtil.isError])

  const FilterHandle = () =>{
    console.log(start, end);
    if(start && end){
      console.log('start')
      dispatch(filterByDate({fetch: axios, start,end}))
    }else{
      toast.error("add start and end before filter");
    }
  }

  let data = [];
  if (books) {
    data = books;
  }

  return (
    <div>
      <div>
        <Search
          button={{
            onClick: () => {
              if (search?.trim()?.length > 0) {
                dispatch(searchInBooks({ fetch: axios, search: search.trim() }));
              }
            },
          }}
          input={{
            onInput: (e) => setSearch(e.target.value),
          }}
        />
        <Button
          onClick={() => dispatch(getBooks({ fetch: axios }))}
          style={{ width: "max-content" }}
        >
          Refresh
        </Button>
      </div>
      <Filter setStart={setStart} setEnd={setEnd} filter={FilterHandle} />

      <Tables.Table>
        <Tables.TableHead>
          <th scope="col">#</th>
          <th scope="col">cover</th>
          <th scope="col">Title</th>
          <th scope="col">category</th>
          <th scope="col">price</th>
          <th scope="col">count</th>
          <th scope="col">edit</th>
        </Tables.TableHead>
        <Tables.TableBody>
          {data?.map((book, index) => {
            return (
              <Tables.TableRow key={book.id}>
                <Tables.TableCell>{index + 1}</Tables.TableCell>
                <Tables.TableCell>
                  <img
                    src={`${process.env.REACT_APP_API_URL}images/${book.cover}`}
                    alt={book.title}
                    width={50}
                    height={50}
                  />
                </Tables.TableCell>

                <Tables.TableCell>{book.title?.slice(1, 30)}</Tables.TableCell>
                <Tables.TableCell>{book.cateName}</Tables.TableCell>
                <Tables.TableCell>{book.price}</Tables.TableCell>
                <Tables.TableCell>{book.count}</Tables.TableCell>
                <Tables.TableCell>
                  <Link to={`/admin/books/edit/${book.id}`} className="edit">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Link>
                </Tables.TableCell>
              </Tables.TableRow>
            );
          })}
        </Tables.TableBody>
      </Tables.Table>

      <Routes>
        <Route path="edit/:id" element={<EditBook />} />
      </Routes>
    </div>
  );
};

export default AdminBooks;
