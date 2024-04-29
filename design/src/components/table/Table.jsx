import React from "react";
import "./style.scss";

// <div className="table-container">
//   <table className="table">
//     <thead>
//       <tr key={"tr-head"}>
//         <th scope="col">#</th>
//         <th scope="col">cover</th>
//         <th scope="col">Title</th>
//         <th scope="col">category</th>
//         <th scope="col">price</th>
//         <th scope="col">count</th>
//         <th scope="col">view</th>
//         <th scope="col">delete</th>
//         <th scope="col">edit</th>
//       </tr>
//     </thead>
//     <tbody>
//       {data?.map((book, index) => {
//         return (
//           <tr key={book.id}>
//             <th scope="row">{index + 1}</th>
//             <td>
//               <img
//                 src={`${process.env.REACT_APP_API_URL}images/${book.cover}`}
//                 alt={book.title}
//                 width={50}
//                 height={50}
//               />
//             </td>
//             <td>{book.title?.slice(1, 30)}</td>
//             <td>{book.cateName}</td>
//             <td>{book.price}</td>
//             <td>{book.count}</td>

//             <td>
//               <Link to={`/books/v/${book.id}`} className="view">
//                 <FontAwesomeIcon icon={faEye} />
//               </Link>
//             </td>
//             <td>
//               <Button onClick={() => handleDelete(book.id)} className="error">
//                 <FontAwesomeIcon icon={faTrashCan} />
//               </Button>
//             </td>
//             <td>
//               <Link to={`/books/edit/${book.id}`} className="edit">
//                 <FontAwesomeIcon icon={faPenToSquare} />
//               </Link>
//             </td>
//           </tr>
//         );
//       })}
//     </tbody>
//   </table>
// </div>;

const Table = ({ children }) => {
  return (
    <div className="table-container">
      <table className="table">{children}</table>
    </div>
  );
};

const TableHead = ({ children }) => {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  );
};

const TableRow = ({ children }) => {
  return <tr>{children}</tr>;
};

const TableBody = ({ children }) => {
  return <tbody>{children}</tbody>;
};
const TableCell = ({ children }) => {
  return <td>{children}</td>;
};

const Tables = {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
};
export default Tables;
