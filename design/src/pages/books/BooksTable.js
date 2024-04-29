import Button from "./../../components/Buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useAxiosPrivate from "./../../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, selectBooksState, updateSuccess } from "./BookSlice";
import { toast } from "react-toastify";
import Tables from "../../components/table/Table";
const rows = [];
const Table = ({ data, ...props }) => {
  const axios = useAxiosPrivate();
  const dispatch = useDispatch();
  const { isError, isLoading, isSuccess } = useSelector(selectBooksState);
  const handleDelete = (id) => {
    dispatch(deleteBook({ fetch: axios, id })).finally(() => {
      dispatch(updateSuccess());
    });
  };

  if (isError) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;
  if (isSuccess) {
    toast.dismiss();
    setTimeout(() => {
      // toast.success("deleted");
    }, 500);
  }
  //   return <div></div>;

  return (
    <Tables.Table>
      <Tables.TableHead>
        <th scope="col">#</th>
        <th scope="col">cover</th>
        <th scope="col">Title</th>
        <th scope="col">category</th>
        <th scope="col">price</th>
        <th scope="col">count</th>
        <th scope="col">view</th>
        <th scope="col">delete</th>
        <th scope="col">edit</th>
      </Tables.TableHead>
      <Tables.TableBody>
        {data?.map((book, index) => {
          return (
            <Tables.TableRow key={book.id}>
              <Tables.TableCell>
                <img
                  src={`${process.env.REACT_APP_API_URL}images/${book.cover}`}
                  alt={book.title}
                  width={50}
                  height={50}
                />
              </Tables.TableCell>

              <Tables.TableCell>{index + 1}</Tables.TableCell>

              <Tables.TableCell>{book.title?.slice(1, 30)}</Tables.TableCell>
              <Tables.TableCell>{book.cateName}</Tables.TableCell>
              <Tables.TableCell>{book.price}</Tables.TableCell>
              <Tables.TableCell>{book.count}</Tables.TableCell>
              <Tables.TableCell>
                <Link to={`/books/${book.id}`} className="view">
                  <FontAwesomeIcon icon={faEye} />
                </Link>
              </Tables.TableCell>
              <Tables.TableCell>
                <Button onClick={() => handleDelete(book.id)} className="delete">
                  <FontAwesomeIcon icon={faTrashCan} />
                </Button>
              </Tables.TableCell>
              <Tables.TableCell>
                <Link to={`/books/edit/${book.id}`} className="edit">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
              </Tables.TableCell>
            </Tables.TableRow>
          );
        })}
      </Tables.TableBody>
    </Tables.Table>
  );
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr key={"tr-head"}>
            <th scope="col">#</th>
            <th scope="col">cover</th>
            <th scope="col">Title</th>
            <th scope="col">category</th>
            <th scope="col">price</th>
            <th scope="col">count</th>
            <th scope="col">view</th>
            <th scope="col">delete</th>
            <th scope="col">edit</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((book, index) => {
            return (
              <tr key={book.id}>
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    src={`${process.env.REACT_APP_API_URL}images/${book.cover}`}
                    alt={book.title}
                    width={50}
                    height={50}
                  />
                </td>
                <td>{book.title?.slice(1, 30)}</td>
                <td>{book.cateName}</td>
                <td>{book.price}</td>
                <td>{book.count}</td>

                <td>
                  <Link to={`/books/v/${book.id}`} className="view">
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                </td>
                <td>
                  <Button onClick={() => handleDelete(book.id)} className="error">
                    <FontAwesomeIcon icon={faTrashCan} />
                  </Button>
                </td>
                <td>
                  <Link to={`/books/edit/${book.id}`} className="edit">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
