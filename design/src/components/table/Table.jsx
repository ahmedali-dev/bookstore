import React from "react";
import "./style.scss";
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
